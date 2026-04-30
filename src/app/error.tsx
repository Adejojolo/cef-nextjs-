"use client";

import * as React from "react";

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-[var(--color-text-secondary)] mb-8">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-background)] rounded-full hover:bg-opacity-90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
