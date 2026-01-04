"use client";

import { useEffect, useEffectEvent, useState, useCallback } from "react";
import { Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { generatePassword, calculateStrength, PasswordOptions, PASSWORD_CHAR_OPTIONS } from "../utils/password-logic";
import { useImmer } from "use-immer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const [options, setOptions] = useImmer<PasswordOptions>({
    length: 16,
    selected: ["uppercase", "lowercase", "numbers"]
  });

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
    setCopied(false);
  }, [options]);

  const updatePassword = useEffectEvent(() => {
    handleGenerate();
  });

  useEffect(() => {
    updatePassword();
  }, [options]);

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const getStrengthColor = (s: number) => {
    if (s < 40) return "bg-red-500";
    if (s < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = (s: number) => {
    if (s < 40) return "Weak";
    if (s < 70) return "Medium";
    return "Strong";
  };

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
                      variant={copied ? "default" : "secondary"}
                      onClick={copyToClipboard}
                      className={cn("transition-all", copied && "bg-green-600 hover:bg-green-700")}
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  }
                ></TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy to Clipboard"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground px-1">
            <span className="flex items-center gap-1.5">
              {strength >= 70 ? (
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              ) : strength >= 40 ? (
                <Shield className="w-3.5 h-3.5 text-yellow-500" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              )}
              Strength:{" "}
              <span className={cn("font-medium", getStrengthColor(strength).replace("bg-", "text-"))}>
                {getStrengthLabel(strength)}
              </span>
            </span>
            <span>{password.length} chars</span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className={cn("h-full transition-all duration-300 ease-out", getStrengthColor(strength))}
              style={{ width: `${strength}%` }}
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
              defaultValue={[16]}
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
