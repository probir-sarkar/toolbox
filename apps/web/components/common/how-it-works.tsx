import { cn } from "@/lib/utils";

interface Step {
    title: string;
    description: string;
}

interface HowItWorksProps {
    title?: string;
    description?: string;
    steps: Step[];
    className?: string;
}

export function HowItWorks({
    title = "How it works",
    description,
    steps,
    className
}: HowItWorksProps) {
    return (
        <div className={cn("w-full", className)}>
            <h3 className="text-balance text-2xl font-bold tracking-tight text-foreground mb-2">
                {title}
            </h3>
            {description && (
                <p className="max-w-2xl text-muted-foreground mb-8">
                    {description}
                </p>
            )}
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                {steps.map((step, index) => {
                    const stepNum = index + 1;
                    return (
                        <div key={index} className="relative pt-4 group">
                            <div className="absolute top-0 left-0 -ml-1.5 h-3 w-3 rounded-full bg-muted-foreground/20 ring-4 ring-background" />
                            <div className="flex flex-col gap-2 border-l-2 border-muted pl-6 pb-2">
                                <span className="text-4xl font-bold text-muted-foreground/70 group-hover:text-muted-foreground transition-colors select-none -ml-1">
                                    0{stepNum}
                                </span>
                                <h4 className="font-semibold text-lg text-foreground">
                                    {step.title}
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
