import { ReactNode } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionCardBaseProps {
  isProcessing: boolean;
  canExecute: boolean;
  onExecute: () => void;

  // Content customization
  title?: string;
  description?: ReactNode;
  executeLabel?: string;
  executingLabel?: string;
  executeIcon?: LucideIcon;

  // Optional secondary action
  showSecondaryAction?: boolean;
  secondaryLabel?: string;
  secondaryIcon?: LucideIcon;
  onSecondaryAction?: () => void;
  isSecondaryLoading?: boolean;

  // Status display
  statusMessage?: ReactNode;
  error?: string | null;

  // Styling
  className?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  statusClassName?: string;
}

export function ActionCardBase({
  isProcessing,
  canExecute,
  onExecute,
  title,
  description,
  executeLabel = "Process",
  executingLabel = "Processing...",
  executeIcon: ExecuteIcon,
  showSecondaryAction,
  secondaryLabel,
  secondaryIcon: SecondaryIcon,
  onSecondaryAction,
  isSecondaryLoading = false,
  statusMessage,
  error,
  className,
  descriptionClassName,
  buttonClassName,
  statusClassName,
}: ActionCardBaseProps) {
  return (
    <Card className={cn("p-6", className)}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}

      {description && (
        <div className={cn("mb-4 text-sm text-muted-foreground", descriptionClassName)}>
          {description}
        </div>
      )}

      <div className="space-y-3">
        <Button
          onClick={onExecute}
          disabled={!canExecute || isProcessing}
          className={cn("w-full", buttonClassName)}
          size="lg"
        >
          {isProcessing ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {executingLabel}
            </>
          ) : (
            <>
              {ExecuteIcon && <ExecuteIcon className="mr-2 h-4 w-4" />}
              {executeLabel}
            </>
          )}
        </Button>

        {showSecondaryAction && onSecondaryAction && (
          <Button
            onClick={onSecondaryAction}
            disabled={isSecondaryLoading}
            variant="outline"
            className={cn("w-full", buttonClassName)}
          >
            {isSecondaryLoading ? (
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              SecondaryIcon && <SecondaryIcon className="mr-2 h-4 w-4" />
            )}
            {secondaryLabel}
          </Button>
        )}
      </div>

      {(statusMessage || error) && (
        <div className={cn("mt-4 text-xs text-center", error ? "text-destructive" : "text-muted-foreground", statusClassName)}>
          {error || statusMessage}
        </div>
      )}
    </Card>
  );
}
