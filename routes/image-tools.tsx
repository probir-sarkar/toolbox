import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Palette, ArrowLeft, Mail } from "lucide-react"

export const Route = createFileRoute('/image-tools')({
  component: ImageToolsComingSoon,
  ssr: false,
})

function ImageToolsComingSoon() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
            <div className="bg-white p-4 rounded-2xl shadow-xl relative">
              <Palette className="w-12 h-12 text-blue-600" />
            </div>
            <Badge className="absolute -top-3 -right-3 bg-slate-900 text-white border-0">
              Coming Soon
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              Image Tools Suite
            </h1>
            <p className="text-slate-600 text-lg">
              Advanced image manipulation tools are in the workshop. Resize, Crop, Filter, and Enhance AI coming your way.
            </p>
          </div>

          <Card className="p-6 border-dashed border-2 bg-white/50 backdrop-blur-sm">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Notify Me</h3>
              <div className="flex gap-2">
                <Button disabled className="w-full bg-slate-900 text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  Join Waitlist
                </Button>
              </div>
              <p className="text-xs text-slate-400">
                We'll only email you when it's ready.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
