import { createFileRoute } from '@tanstack/react-router'
import { useState, useContext } from 'react'
import Uppy from '@uppy/core'
import { UppyContext, UppyContextProvider } from '@uppy/react'

import { Dropzone } from '@/components/common/uppy/file-uploader'
import FilesList from '@/components/common/uppy/file-list'
import ImageFilesList from '@/features/image-converter/image-file-list'

export const Route = createFileRoute('/image-converter/')({
  component: RouteComponent,
})

function ImageConverterView() {
  const { uppy } = useContext(UppyContext)

  return (
    <div className="space-y-4 p-6">
      <Dropzone note="Images only" />
      <ImageFilesList />
    </div>
  )
}

function RouteComponent() {
  const [uppy] = useState(() => new Uppy())
  return (
    <UppyContextProvider uppy={uppy}>
      <ImageConverterView />
    </UppyContextProvider>
  )
}
