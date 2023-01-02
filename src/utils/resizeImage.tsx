import Resizer from 'react-image-file-resizer'

interface ResizeFileProps {
  file: Blob
  maxSize?: number
  compressFormat?: string
  outputType?: string
  quality?: number
  rotation?: number
}

export const resizeFile = ({
  file,
  maxSize = 300,
  compressFormat = 'JPEG',
  outputType = 'blob',
  quality = 100,
  rotation = 0,
}: ResizeFileProps) =>
  new Promise<string | File | Blob | ProgressEvent<FileReader>>((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxSize,
      maxSize,
      compressFormat,
      quality,
      rotation,
      (uri) => {
        resolve(uri)
      },
      outputType
    )
  })
