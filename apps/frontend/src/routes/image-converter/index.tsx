import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useCallback, useState } from 'react'
import Uppy from '@uppy/core'
import { UppyContextProvider } from '@uppy/react'
import type { UppyFile } from '@uppy/core'

import { PhotonImageConverter, ImageFormat } from '@toolbox/image-utils'

import { Dropzone } from '@/components/common/uppy/file-uploader'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/image-converter/')({
  component: RouteComponent,
})

function ImageConverter({ uppy }: { uppy: Uppy }) {
  const [format, setFormat] = useState<ImageFormat>('jpeg')
  const [quality, setQuality] = useState(90)
  const [files, setFiles] = useState<ConvertedFile[]>([])
  const [loading, setLoading] = useState(false)

  const convert = useCallback(
    async (uppyFiles: UppyFile<Meta, Meta>[]) => {
      setLoading(true)
      const output: ConvertedFile[] = []

      try {
        for (const file of uppyFiles) {
          if (!file.type?.startsWith('image/')) continue

          const converter = await PhotonImageConverter.fromBlob(
            (file.data as Blob).slice(0),
          )

          const bytes = converter.convertToFormat('jpeg', { quality: 92 })

          const blob = new Blob([bytes], { type: 'image/jpeg' })

          output.push({
            name: file.name,
            blob,
            format,
          })
          converter.destroy()
        }

        setFiles(output)
      } catch (err) {
        console.error('Conversion failed:', err)
      } finally {
        setLoading(false)
      }
    },
    [format, quality],
  )

  useEffect(() => {
    uppy.on('files-added', convert)
    return () => uppy.off('files-added', convert)
  }, [uppy, convert])

  const download = (file: ConvertedFile) => {
    const url = URL.createObjectURL(file.blob)
    const a = document.createElement('a')

    a.href = url
    a.download = file.name.replace(/\.[^/.]+$/, `.${file.format}`)

    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4 p-6">
      <Dropzone note="Images only" />

      <div className="flex gap-2">
        <Button onClick={() => setFormat('jpeg')}>JPEG</Button>
        <Button onClick={() => setFormat('png')}>PNG</Button>
        <Button onClick={() => setFormat('webp')}>WEBP</Button>
      </div>

      {loading && <p>Converting…</p>}

      {files.map((file, i) => (
        <div key={i} className="flex justify-between">
          <span>{file.name}</span>
          <Button size="sm" onClick={() => download(file)}>
            Download
          </Button>
        </div>
      ))}
    </div>
  )
}

function RouteComponent() {
  const [uppy] = useState(() => new Uppy())
  return (
    <UppyContextProvider uppy={uppy}>
      <ImageConverter uppy={uppy} />
    </UppyContextProvider>
  )
}

interface ConvertedFile {
  name: string
  blob: Blob
  format: ImageFormat
}
type Meta = Record<string, unknown>
