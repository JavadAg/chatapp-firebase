import { storage } from '@/services/firebase'
import { resizeFile } from '@/utils/resizeImage'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
  StorageError,
  UploadResult,
} from 'firebase/storage'
import { useState } from 'react'

export const useStorage = () => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [error, setError] = useState<StorageError>()
  const [snapshot, setSnapshot] = useState<UploadTaskSnapshot>()

  const handleUpload = async (
    file: File
  ): Promise<UploadResult | undefined> => {
    const resizedImage = await resizeFile({ file: file, maxSize: 400 })

    return new Promise((resolve) => {
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, resizedImage as Blob)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setSnapshot(snapshot)
        },
        (error) => {
          setUploading(false)
          setError(error)
          resolve(undefined)
        },
        () => {
          setUploading(false)
          setSnapshot(undefined)
          resolve(
            getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => downloadURL as unknown as UploadResult
            )
          )
        }
      )
    })
  }
  return { handleUpload, uploading, error, snapshot }
}
