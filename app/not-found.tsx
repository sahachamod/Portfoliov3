import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0f1a] px-6 text-center">
      <div>
        <p className="technical-label">404 / LOST SIGNAL</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Research node unavailable.</h1>
        <Link className="mt-8 inline-flex rounded-md border border-white/15 px-4 py-2 text-sm text-accent" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
