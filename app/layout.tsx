import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = "Sahan Chamod | DevSecOps Engineer & Cybersecurity Researcher";
const description =
  "Sahan Chamod is a DevSecOps Engineer and Cybersecurity Researcher from Colombo, Sri Lanka, focused on secure software delivery, cloud and container security, application security, penetration testing, vulnerability research, and bug bounty. Recognised in the NASA Hall of Fame; global rank #45 at Hack The Box Cyber Apocalypse 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Sahan Chamod",
    "Sahan Chamod DevSecOps",
    "Sahan Chamod cybersecurity",
    "Sahan Chamod security researcher",
    "Sahan Chamod NASA Hall of Fame",
    "DevSecOps Engineer Sri Lanka",
    "cybersecurity researcher Colombo",
    "vulnerability research",
    "penetration testing",
    "bug bounty",
    "Hack The Box Cyber Apocalypse 2026"
  ],
  authors: [{ name: "Sahan Chamod" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    type: "profile",
    url: siteUrl,
    siteName: "Sahan Chamod",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Sahan Chamod DevSecOps and security research portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.svg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark"
};

// Development only: some browser security extensions (Bitdefender, Avast) inject `bis_*` attributes
// into the DOM before React hydrates, which triggers hydration-mismatch warnings. This strips them.
const stripExtensionAttributes = `
(function () {
  var clean = function (node) {
    if (node.nodeType !== 1) return;
    for (var i = node.attributes.length - 1; i >= 0; i -= 1) {
      var name = node.attributes[i].name;
      if (name.indexOf("bis_") === 0 || name.indexOf("__processed_") === 0) node.removeAttribute(name);
    }
  };
  var sweep = function (root) {
    clean(root);
    var walker = document.createTreeWalker(root, 1);
    while (walker.nextNode()) clean(walker.currentNode);
  };
  sweep(document.documentElement);
  new MutationObserver(function (records) {
    for (var r = 0; r < records.length; r += 1) {
      var record = records[r];
      if (record.type === "attributes") clean(record.target);
      for (var n = 0; n < record.addedNodes.length; n += 1) if (record.addedNodes[n].nodeType === 1) sweep(record.addedNodes[n]);
    }
  }).observe(document.documentElement, { attributes: true, childList: true, subtree: true });
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {process.env.NODE_ENV === "development" ? <script dangerouslySetInnerHTML={{ __html: stripExtensionAttributes }} /> : null}
        {children}
      </body>
    </html>
  );
}
