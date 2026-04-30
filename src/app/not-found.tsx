export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">The page you are looking for does not exist.</p>
      <a href="/" className="bg-[var(--color-accent)] text-[var(--color-background)] px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
        Return Home
      </a>
    </div>
  );
}
