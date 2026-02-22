import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router"
import appCss from "../../styles/globals.css?url"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Toolbox - Free Online Tools for PDF, Images & More" },
      {
        name: "description",
        content: "Free, privacy-focused online tools. Merge, split, and convert PDFs. Convert, resize, and optimize images. Generate secure passwords. 100% offline, no uploads."
      },
      // Open Graph / Facebook
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://toolbox.com",
      },
      {
        property: "og:title",
        content: "Toolbox - Free Online Tools",
      },
      {
        property: "og:description",
        content: "Free, privacy-focused online tools. Process files locally in your browser with zero uploads.",
      },
      {
        property: "og:image",
        content: "/og-image.png",
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Toolbox - Free Online Tools",
      },
      {
        name: "twitter:description",
        content: "Free, privacy-focused online tools. Process files locally in your browser with zero uploads.",
      },
      {
        name: "twitter:image",
        content: "/og-image.png",
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
