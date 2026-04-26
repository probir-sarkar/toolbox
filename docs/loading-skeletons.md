# Loading Skeletons

Loading skeleton components for Suspense fallbacks. These provide visual placeholders while content is being loaded.

## Available Skeletons

### DropZoneSkeleton

A skeleton for file dropzone components.

```tsx
import { DropZoneSkeleton } from "@/components/skeletons";

<Suspense fallback={<DropZoneSkeleton />}>
  <LazyDropZone />
</Suspense>
```

### ActionCardSkeleton

A skeleton for action card components.

**Default (gradient sidebar style):**
```tsx
<Suspense fallback={<ActionCardSkeleton />}>
  <LazyActionCard />
</Suspense>
```

**Card variant:**
```tsx
<Suspense fallback={<ActionCardSkeleton variant="card" />}>
  <LazyActionCard />
</Suspense>
```

### SettingsSkeleton

A skeleton for settings panels.

```tsx
import { SettingsSkeleton } from "@/components/skeletons";

<Suspense fallback={<SettingsSkeleton />}>
  <LazySettings />
</Suspense>
```

## Example: Complete Route

Here's how to use skeletons in a complete route:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from "react"
import { DropZoneSkeleton, ActionCardSkeleton, SettingsSkeleton } from "@/components/skeletons"

const DropZone = lazy(() => import("./drop-zone"))
const FileList = lazy(() => import("./file-list"))
const Settings = lazy(() => import("./settings"))
const ActionCard = lazy(() => import("./action-card"))

export const Route = createFileRoute('/my-tool')({
  component: MyToolPage,
})

function MyToolPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero section */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Left Column - Upload & List */}
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<DropZoneSkeleton />}>
              <DropZone />
            </Suspense>
            <Suspense fallback={
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-lg animate-pulse">
                    <div className="w-12 h-12 bg-muted rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-muted rounded"></div>
                      <div className="h-3 w-1/2 bg-muted rounded"></div>
                    </div>
                    <div className="w-8 h-8 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            }>
              <FileList />
            </Suspense>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            <Suspense fallback={<SettingsSkeleton />}>
              <Settings />
            </Suspense>
            <Suspense fallback={<ActionCardSkeleton />}>
              <ActionCard />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
```

## FAQ & File List Skeletons

For FAQ sections and file lists, you can use inline skeleton markup:

```tsx
<Section>
  <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
  <Suspense fallback={
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-16 bg-muted rounded animate-pulse" />
      ))}
    </div>
  }>
    <FAQ />
  </Suspense>
</Section>
```

## Benefits

1. **Better UX**: Users see structured content placeholders instead of blank screens
2. **Perceived Performance**: App feels faster even during lazy loading
3. **Consistency**: All pages have the same loading state appearance
4. **No Props Needed**: Skeletons are self-contained, no configuration required
5. **Accessible**: Uses semantic HTML with proper ARIA attributes

## Customization

All skeletons accept a `className` prop for additional styling:

```tsx
<DropZoneSkeleton className="h-96" />
<ActionCardSkeleton className="shadow-lg" />
```

## Animation

All skeletons use `animate-pulse` from Tailwind CSS for a smooth loading animation. The animation is consistent across all skeleton components.
