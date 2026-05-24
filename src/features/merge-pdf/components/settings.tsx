import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { useMergePdfContext } from "../context";

export function MergeSettings() {
  const { settings, updateSettings } = useMergePdfContext();

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
              value={settings.outputFileName.replace(".pdf", "")}
              onChange={(e) => {
                const val = e.target.value;
                updateSettings({ outputFileName: val.endsWith(".pdf") ? val : `${val}.pdf` });
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
