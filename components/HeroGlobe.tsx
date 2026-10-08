"use client";

import { useEffect, useRef } from "react";
import { LAND_H, LAND_MASK, LAND_W } from "@/lib/landMask";

type Point = { x: number; y: number; z: number };

export type AttackEvent = { stage: string; from: string; to: string; time: string };

const LIGHT = normalize({ x: 0.75, y: 0.42, z: -0.28 });
const TILT = 0.4;
const AUTO_SPIN = 0.00011;
const ACCENT = "214, 181, 110";
const THREAT = "255, 120, 90";

function normalize(v: Point): Point {
  const length = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / length, y: v.y / length, z: v.z / length };
}

function latLon(lat: number, lon: number): Point {
  const phi = (lat * Math.PI) / 180;
  const theta = (lon * Math.PI) / 180;
  return { x: Math.cos(phi) * Math.cos(theta), y: Math.sin(phi), z: Math.cos(phi) * Math.sin(theta) };
}

// Decode the 1-bit land mask once.
let landBits: Uint8Array | null = null;
function isLand(lat: number, lon: number): boolean {
  if (!landBits) {
    const binary = atob(LAND_MASK);
    landBits = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) landBits[i] = binary.charCodeAt(i);
  }
  const col = Math.min(LAND_W - 1, Math.max(0, Math.floor(((lon + 180) / 360) * LAND_W)));
  const row = Math.min(LAND_H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * LAND_H)));
  const index = row * LAND_W + col;
  return (landBits[index >> 3] & (0x80 >> (index & 7))) !== 0;
}

// Fibonacci lattice over the sphere, split into land and ocean points.
function buildPoints(count: number) {
  const land: number[] = [];
  const ocean: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(z, x) * 180) / Math.PI;
    if (lat < -60) continue; // skip Antarctica for a cleaner silhouette
    if (isLand(lat, lon)) land.push(x, y, z);
    else if (i % 5 === 0) ocean.push(x, y, z);
  }
  return { land: new Float32Array(land), ocean: new Float32Array(ocean) };
}

const NODES = [
  { code: "US-EAST", pos: latLon(39, -77) },
  { code: "US-WEST", pos: latLon(37, -122) },
  { code: "BR-SOUTH", pos: latLon(-23, -46) },
  { code: "EU-WEST", pos: latLon(51, -0.1) },
  { code: "EU-CENTRAL", pos: latLon(50, 8.7) },
  { code: "ME-SOUTH", pos: latLon(25, 55) },
  { code: "LK-COLOMBO", pos: latLon(6.9, 79.9) },
  { code: "AP-SOUTHEAST", pos: latLon(1.3, 103.8) },
  { code: "AP-NORTHEAST", pos: latLon(35.7, 139.7) },
  { code: "AU-EAST", pos: latLon(-33.9, 151.2) },
  { code: "ZA-SOUTH", pos: latLon(-33.9, 18.4) }
];

const STAGES = ["Reconnaissance", "Initial Access", "Privilege Escalation", "Lateral Movement", "Exfiltration"];

// Each chain walks a route of node indices. Hop i is labelled with STAGES[i].
const CHAINS: { route: number[]; period: number; offset: number }[] = [
  { route: [1, 0, 3, 4, 6], period: 2.6, offset: 0 },
  { route: [8, 7, 6, 5, 4], period: 3.1, offset: 1.4 },
  { route: [2, 10, 5, 6, 7], period: 3.4, offset: 2.6 },
  { route: [9, 7, 8, 1, 0], period: 2.9, offset: 0.9 }
];

const ARC_LIFT = 0.3;
const ARC_SAMPLES = 40;

function arcPoint(a: Point, b: Point, t: number): Point {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega) || 1e-6;
  const wa = Math.sin((1 - t) * omega) / sinOmega;
  const wb = Math.sin(t * omega) / sinOmega;
  const lift = 1 + ARC_LIFT * Math.sin(Math.PI * t) * Math.min(1, omega / 1.1);
  return { x: (a.x * wa + b.x * wb) * lift, y: (a.y * wa + b.y * wb) * lift, z: (a.z * wa + b.z * wb) * lift };
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function HeroGlobe({ onEvent }: { onEvent?: (event: AttackEvent) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { land, ocean } = buildPoints(16000);

    let width = 0;
    let height = 0;
    let frame = 0;
    let angle = 0.9;
    let tiltOffset = 0;
    let targetTilt = 0;
    let last = performance.now();
    let dragging = false;
    let dragX = 0;
    let dragVelocity = 0;
    const lastHop = CHAINS.map(() => -1);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Pointer interaction: drag to spin, hover to tilt slightly.
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      dragX = event.clientX;
      dragVelocity = 0;
      canvas.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetTilt = ((event.clientY - rect.top) / rect.height - 0.5) * 0.25;
      if (!dragging) return;
      const dx = event.clientX - dragX;
      dragX = event.clientX;
      dragVelocity = dx * 0.0045;
      angle += dragVelocity;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    const onPointerLeave = () => {
      targetTilt = 0;
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const draw = (now: number) => {
      const delta = Math.min(now - last, 50);
      last = now;

      if (!reduceMotion) {
        if (!dragging) {
          if (Math.abs(dragVelocity) > 0.00005) {
            angle += dragVelocity;
            dragVelocity *= 0.95;
          } else {
            angle += AUTO_SPIN * delta;
          }
        }
        tiltOffset += (targetTilt - tiltOffset) * 0.06;
      }

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;
      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const cosX = Math.cos(TILT + tiltOffset);
      const sinX = Math.sin(TILT + tiltOffset);

      const project = (p: Point) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const perspective = 1 / (1 - z2 * 0.16);
        return { x: cx + x1 * radius * perspective, y: cy - y2 * radius * perspective, z: z2, lx: x1 };
      };

      context.clearRect(0, 0, width, height);

      // Atmosphere glow on the lit side.
      const glow = context.createRadialGradient(cx + radius * 0.55, cy - radius * 0.35, radius * 0.2, cx, cy, radius * 1.45);
      glow.addColorStop(0, `rgba(${ACCENT}, 0.34)`);
      glow.addColorStop(0.45, `rgba(${ACCENT}, 0.09)`);
      glow.addColorStop(1, `rgba(${ACCENT}, 0)`);
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      // Planet body.
      const body = context.createRadialGradient(cx - radius * 0.3, cy + radius * 0.2, radius * 0.1, cx, cy, radius);
      body.addColorStop(0, "rgba(16, 22, 36, 0.98)");
      body.addColorStop(1, "rgba(8, 11, 20, 1)");
      context.fillStyle = body;
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fill();

      // Orbit rings.
      context.save();
      context.translate(cx, cy);
      for (const [rx, ry, rotation, alpha] of [
        [radius * 1.38, radius * 0.46, -0.5, 0.16],
        [radius * 1.62, radius * 1.52, 0.35, 0.1]
      ] as const) {
        context.beginPath();
        context.ellipse(0, 0, rx, ry, rotation, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
        context.lineWidth = 1;
        context.stroke();
      }
      context.restore();

      // Satellite on the inner ring.
      const t = now * 0.00035;
      const satX = cx + Math.cos(t) * radius * 1.38 * Math.cos(-0.5) - Math.sin(t) * radius * 0.46 * Math.sin(-0.5);
      const satY = cy + Math.cos(t) * radius * 1.38 * Math.sin(-0.5) + Math.sin(t) * radius * 0.46 * Math.cos(-0.5);
      const satInFront = Math.sin(t) > 0;
      const drawSatellite = () => {
        context.beginPath();
        context.arc(satX, satY, 2.2, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 244, 220, 0.95)";
        context.shadowColor = `rgba(${ACCENT}, 0.9)`;
        context.shadowBlur = 12;
        context.fill();
        context.shadowBlur = 0;
      };
      if (!satInFront) drawSatellite();

      // Scan ring sweeping over the globe.
      const scanY = Math.sin(now * 0.0004) * 0.9;
      const scanR = Math.sqrt(Math.max(0, 1 - scanY * scanY));
      context.beginPath();
      let scanDrawing = false;
      for (let i = 0; i <= 90; i += 1) {
        const a = (i / 90) * Math.PI * 2;
        const pt = project({ x: Math.cos(a) * scanR, y: scanY, z: Math.sin(a) * scanR });
        if (pt.z < 0) {
          scanDrawing = false;
          continue;
        }
        if (!scanDrawing) {
          context.moveTo(pt.x, pt.y);
          scanDrawing = true;
        } else context.lineTo(pt.x, pt.y);
      }
      context.strokeStyle = `rgba(${ACCENT}, 0.18)`;
      context.lineWidth = 1;
      context.stroke();

      // Surface points.
      const drawPoints = (buffer: Float32Array, isLandLayer: boolean) => {
        for (let i = 0; i < buffer.length; i += 3) {
          const px = buffer[i];
          const py = buffer[i + 1];
          const pz = buffer[i + 2];
          const x1 = px * cosY - pz * sinY;
          const z1 = px * sinY + pz * cosY;
          const y2 = py * cosX - z1 * sinX;
          const z2 = py * sinX + z1 * cosX;
          if (z2 < -0.1) continue;

          const lit = Math.max(0, x1 * LIGHT.x + y2 * LIGHT.y + z2 * LIGHT.z);
          const rim = Math.pow(lit, 2.2);
          const depth = (z2 + 1) / 2;
          const perspective = 1 / (1 - z2 * 0.16);
          const sx = cx + x1 * radius * perspective;
          const sy = cy - y2 * radius * perspective;

          if (isLandLayer) {
            const size = 0.9 + rim * 1.6 + depth * 0.5;
            const alpha = 0.3 + depth * 0.35 + rim * 0.7;
            const r = Math.round(165 + rim * 90);
            const g = Math.round(172 + rim * 70);
            const b = Math.round(190 + rim * 35);
            context.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, alpha)})`;
            context.beginPath();
            context.arc(sx, sy, size, 0, Math.PI * 2);
            context.fill();
          } else {
            context.fillStyle = `rgba(120, 135, 170, ${0.06 + depth * 0.12 + rim * 0.25})`;
            context.beginPath();
            context.arc(sx, sy, 0.6 + rim * 0.8, 0, Math.PI * 2);
            context.fill();
          }
        }
      };
      drawPoints(ocean, false);
      drawPoints(land, true);

      // Attack chains.
      const seconds = now / 1000;
      const nodeHits = new Array<number>(NODES.length).fill(0);
      const labels: { x: number; y: number; text: string }[] = [];

      CHAINS.forEach((chain, chainIndex) => {
        const hopCount = chain.route.length - 1;
        const cycle = reduceMotion ? 0.5 : ((seconds + chain.offset) / chain.period) % hopCount;
        const activeHop = Math.floor(cycle);
        const progress = easeInOut(cycle - activeHop);

        if (activeHop !== lastHop[chainIndex]) {
          lastHop[chainIndex] = activeHop;
          onEventRef.current?.({
            stage: STAGES[activeHop] ?? STAGES[STAGES.length - 1],
            from: NODES[chain.route[activeHop]].code,
            to: NODES[chain.route[activeHop + 1]].code,
            time: new Date().toLocaleTimeString("en-GB", { hour12: false })
          });
        }

        for (let hop = 0; hop < hopCount; hop += 1) {
          const from = NODES[chain.route[hop]].pos;
          const to = NODES[chain.route[hop + 1]].pos;
          const completed = hop < activeHop;
          const active = hop === activeHop;

          context.beginPath();
          let drawing = false;
          for (let i = 0; i <= ARC_SAMPLES; i += 1) {
            const pt = project(arcPoint(from, to, i / ARC_SAMPLES));
            if (pt.z < 0.02) {
              drawing = false;
              continue;
            }
            if (!drawing) {
              context.moveTo(pt.x, pt.y);
              drawing = true;
            } else context.lineTo(pt.x, pt.y);
          }
          context.setLineDash(completed || active ? [] : [2, 5]);
          context.strokeStyle = completed ? `rgba(${ACCENT}, 0.38)` : active ? `rgba(${ACCENT}, 0.22)` : `rgba(${ACCENT}, 0.12)`;
          context.lineWidth = 1;
          context.stroke();
          context.setLineDash([]);

          if (!active) continue;

          // Pulse with a trailing tail.
          const tailStart = Math.max(0, progress - 0.24);
          context.beginPath();
          drawing = false;
          for (let i = 0; i <= 18; i += 1) {
            const tt = tailStart + ((progress - tailStart) * i) / 18;
            const pt = project(arcPoint(from, to, tt));
            if (pt.z < 0.02) {
              drawing = false;
              continue;
            }
            if (!drawing) {
              context.moveTo(pt.x, pt.y);
              drawing = true;
            } else context.lineTo(pt.x, pt.y);
          }
          context.strokeStyle = `rgba(${THREAT}, 0.9)`;
          context.lineWidth = 1.8;
          context.shadowColor = `rgba(${THREAT}, 0.9)`;
          context.shadowBlur = 10;
          context.stroke();
          context.shadowBlur = 0;

          const head = project(arcPoint(from, to, progress));
          if (head.z >= 0.02) {
            context.beginPath();
            context.arc(head.x, head.y, 2.6, 0, Math.PI * 2);
            context.fillStyle = "rgba(255, 236, 220, 1)";
            context.shadowColor = `rgba(${THREAT}, 1)`;
            context.shadowBlur = 14;
            context.fill();
            context.shadowBlur = 0;
            if (progress > 0.12 && progress < 0.88) labels.push({ x: head.x, y: head.y, text: STAGES[hop] ?? "" });
          }

          if (progress > 0.82) nodeHits[chain.route[hop + 1]] = Math.max(nodeHits[chain.route[hop + 1]], (progress - 0.82) / 0.18);
          if (progress < 0.2) nodeHits[chain.route[hop]] = Math.max(nodeHits[chain.route[hop]], 1 - progress / 0.2);
        }
      });

      // Nodes with region codes.
      context.font = "500 9px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textBaseline = "middle";
      NODES.forEach((node, index) => {
        const pt = project(node.pos);
        if (pt.z < 0.02) return;
        const hit = nodeHits[index];
        const depthAlpha = 0.45 + pt.z * 0.55;

        if (hit > 0) {
          const ripple = 4 + (1 - hit) * 16;
          context.beginPath();
          context.arc(pt.x, pt.y, ripple, 0, Math.PI * 2);
          context.strokeStyle = `rgba(${THREAT}, ${0.55 * hit})`;
          context.lineWidth = 1.2;
          context.stroke();
        }

        context.beginPath();
        context.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${ACCENT}, ${0.55 * depthAlpha})`;
        context.lineWidth = 1;
        context.stroke();

        context.beginPath();
        context.arc(pt.x, pt.y, 1.9 + hit * 1.2, 0, Math.PI * 2);
        context.fillStyle = hit > 0 ? `rgba(255, ${Math.round(200 - hit * 80)}, ${Math.round(160 - hit * 70)}, 1)` : `rgba(240, 220, 170, ${depthAlpha})`;
        context.shadowColor = hit > 0 ? `rgba(${THREAT}, 0.9)` : `rgba(${ACCENT}, 0.8)`;
        context.shadowBlur = 8;
        context.fill();
        context.shadowBlur = 0;

        if (pt.z > 0.45) {
          context.fillStyle = `rgba(${ACCENT}, ${0.35 + (pt.z - 0.45) * 0.9})`;
          context.textAlign = pt.lx > 0 ? "left" : "right";
          context.fillText(node.code, pt.x + (pt.lx > 0 ? 8 : -8), pt.y);
        }
      });

      // Stage labels next to the pulse heads.
      context.textAlign = "left";
      for (const label of labels) {
        const text = label.text.toUpperCase();
        const w = context.measureText(text).width + 10;
        context.fillStyle = "rgba(8, 11, 20, 0.85)";
        context.fillRect(label.x + 8, label.y - 8, w, 16);
        context.strokeStyle = `rgba(${THREAT}, 0.5)`;
        context.lineWidth = 1;
        context.strokeRect(label.x + 8.5, label.y - 7.5, w - 1, 15);
        context.fillStyle = `rgba(${THREAT}, 1)`;
        context.fillText(text, label.x + 13, label.y);
      }

      // Lit limb.
      const limb = context.createLinearGradient(cx - radius, cy + radius, cx + radius, cy - radius);
      limb.addColorStop(0, "rgba(255, 240, 210, 0)");
      limb.addColorStop(0.55, "rgba(255, 240, 210, 0)");
      limb.addColorStop(0.82, "rgba(255, 240, 210, 0.75)");
      limb.addColorStop(1, "rgba(255, 240, 210, 0.95)");
      context.beginPath();
      context.arc(cx, cy, radius * 1.03, -Math.PI * 0.62, Math.PI * 0.2);
      context.strokeStyle = limb;
      context.lineWidth = 2.2;
      context.shadowColor = `rgba(${ACCENT}, 0.9)`;
      context.shadowBlur = 18;
      context.stroke();
      context.shadowBlur = 0;

      if (satInFront) drawSatellite();

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing" aria-hidden="true" />;
}
