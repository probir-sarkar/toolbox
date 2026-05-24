import { TrustBar } from "./trust-bar"

interface PageHeaderProps {
  title: string
  subtitle: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-12 text-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          {subtitle}
        </p>
      </div>
      <TrustBar />
    </div>
  )
}
