import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl">404</h1>
        <Link href="/" className="underline">
          Home
        </Link>
      </div>
    </main>
  );
}
