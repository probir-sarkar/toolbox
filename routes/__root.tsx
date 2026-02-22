import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router"
import appCss from "../app/globals.css?url"
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
      { title: "Toolbox - Free Online Tools" },
      {
        name: "description",
        content: "A comprehensive suite of free, privacy-focused online tools."
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
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
