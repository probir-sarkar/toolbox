import { Link } from "@tanstack/react-router";

export function SkipLink() {
  return (
    <Link
      to="/"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        mainContent?.focus();
        mainContent?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      Skip to main content
    </Link>
  );
}
