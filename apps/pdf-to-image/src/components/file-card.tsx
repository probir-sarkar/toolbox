import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";

interface FileCardProps {
  name: string;
  size: string;
  pages: number;
  onClear?: () => void;
}

export function FileCard({ name, size, pages, onClear }: FileCardProps) {
  return (
    <Card className="border-muted bg-gray-50">
      <CardContent className="flex items-center justify-between ">
        {/* Left Section */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
            <FileText className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <span className="block text-black font-medium">{name}</span>
            <p className="text-xs text-gray-500">
              {size} • {pages} page{pages > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Clear Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={onClear}
          className="text-gray-500 hover:text-black hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
