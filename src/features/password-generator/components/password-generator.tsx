import { useEffect, useState, useCallback } from "react";
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils";
import { generatePassword, getPasswordStrength, STRENGTH_COLORS } from "../services/password-generator";
import type { PasswordOptions } from "../types";
import { PASSWORD_CHAR_OPTIONS, DEFAULT_PASSWORD_OPTIONS } from "../constants";
import { useImmer } from "use-immer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { useClipboard } from "@/shared/hooks/use-clipboard";

export function PasswordGenerator() {
  const clipboard = useClipboard({ timeout: 2000 });
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(getPasswordStrength(0));

  const [options, setOptions] = useImmer<PasswordOptions>({
    ...DEFAULT_PASSWORD_OPTIONS
  });

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setStrength(getPasswordStrength(calculateStrengthValue(newPassword)));
    clipboard.reset();
  }, [options, clipboard]);

  // Local helper for strength calculation
  const calculateStrengthValue = (password: string): number => {
    let strength = 0;
    if (password.length > 8) strength += 20;
    if (password.length > 12) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    return Math.min(100, strength);
  };

  useEffect(() => {
    handleGenerate();
  }, [options]);

  const getStrengthIcon = () => {
    if (strength.score >= 70) return ShieldCheck;
    if (strength.score >= 40) return Shield;
    return ShieldAlert;
  };

  const getStrengthColor = () => {
    if (strength.score < 40) return STRENGTH_COLORS.weak;
    if (strength.score < 70) return STRENGTH_COLORS.medium;
    return STRENGTH_COLORS.strong;
  };

  const StrengthIcon = getStrengthIcon();

  return (
    <Card className="w-full shadow-lg border-border/50">
      <CardHeader>
        <CardTitle>Generate Password</CardTitle>
        <CardDescription>Create strong, secure passwords instantly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display Area */}
        <div className="relative group">
          <div className="min-h-16 flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3 border border-border transition-colors hover:border-primary/50 hover:bg-muted/80">
            <div className="font-mono text-xl md:text-2xl break-all mr-4 text-foreground font-medium tracking-wide">
              {password}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleGenerate}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  }
                ></TooltipTrigger>
                <TooltipContent>
                  <p>Regenerate Password</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      size="icon"
                      variant={clipboard.copied ? "default" : "secondary"}
                      onClick={() => clipboard.copy(password)}
                      className={cn("transition-all", clipboard.copied && "bg-green-600 hover:bg-green-700")}
                    >
                      {clipboard.copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  }
                ></TooltipTrigger>
                <TooltipContent>
                  <p>{clipboard.copied ? "Copied!" : "Copy to Clipboard"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground px-1">
            <span className="flex items-center gap-1.5">
              <StrengthIcon className={cn("w-3.5 h-3.5", strength.color.replace("text-", "text-"))} />
              Strength: <span className={cn("font-medium", strength.color)}>{strength.label}</span>
            </span>
            <span>{password.length} chars</span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className={cn("h-full transition-all duration-300 ease-out", getStrengthColor())}
              style={{ width: `${strength.score}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Password Length</Label>
              <span className="text-sm font-mono bg-secondary px-2 py-1 rounded-md min-w-12 text-center">
                {options.length}
              </span>
            </div>
            <Slider
              defaultValue={[DEFAULT_PASSWORD_OPTIONS.length]}
              value={[options.length]}
              min={6}
              max={50}
              step={1}
              onValueChange={(vals: number | readonly number[]) => {
                const value = Array.isArray(vals) ? vals[0] : vals;
                setOptions((draft) => {
                  draft.length = value;
                });
              }}
              className="py-4"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Characters</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PASSWORD_CHAR_OPTIONS.map((opt) => {
                const isChecked = options.selected.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setOptions((draft) => {
                        if (isChecked) {
                          // If trying to uncheck, ensure it's not the last one
                          if (draft.selected.length > 1) {
                            draft.selected = draft.selected.filter((id) => id !== opt.id);
                          }
                        } else {
                          draft.selected.push(opt.id);
                        }
                      })
                    }
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
                      isChecked
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-muted bg-transparent text-muted-foreground hover:bg-muted/50 hover:border-muted-foreground/50"
                    )}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      {opt.icon && <opt.icon className="w-5 h-5 opacity-70" />}
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="font-medium text-sm leading-none">{opt.label}</span>
                        <span className="text-xs opacity-70">{opt.example}</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                        isChecked ? "bg-primary border-primary" : "border-muted-foreground/30 bg-transparent"
                      )}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
