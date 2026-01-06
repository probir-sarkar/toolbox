"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMergePdfStore } from "./store";

export function MergeSettings() {
  const mergedFileName = useMergePdfStore((state) => state.mergedFileName);
  const setMergedFileName = useMergePdfStore((state) => state.setMergedFileName);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Output Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="filename">Output Filename</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="filename"
              value={mergedFileName.replace(".pdf", "")}
              onChange={(e) => {
                const val = e.target.value;
                setMergedFileName(val.endsWith(".pdf") ? val : `${val}.pdf`);
              }}
              placeholder="merged-document"
            />
            <span className="text-sm text-muted-foreground">.pdf</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
