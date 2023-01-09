/* eslint-disable @typescript-eslint/no-non-null-assertion */
import InputField from '@/components/Ui/Input/InputField'
import InputFile from '@/components/Ui/Input/InputFile'
import InputSubmit from '@/components/Ui/Input/InputSubmit'
import { useFirestore } from '@/hooks/useFireStore'
import useStore from '@/store/useStore'
import {
  messageValidationSchema,
  MessageValidationSchema,
} from '@/utils/validateSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiAttachmentLine, RiSendPlane2Line, RiCheckLine } from 'react-icons/ri'
import { useStorage } from '@/hooks/useStorage'
import { toast } from 'react-toastify'
import { ChatItem } from '@/types/chat.types'
import { User, UserInfo } from 'firebase/auth'

const SendMessage = ({ conversationId }: { conversationId: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { handleUpdate, handleSet } = useFirestore()
  const { handleUpload } = useStorage()
  const currentUser = useStore((state) => state.currentUser) as User
  const activeChat = useStore((state) => state.activeChat) as
    | ChatItem
    | UserInfo
  const setActiveChat = useStore((state) => state.setActiveChat)

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<MessageValidationSchema>({
    resolver: zodResolver(messageValidationSchema),
  })

  const onSubmit: SubmitHandler<MessageValidationSchema> = async (data) => {
    let messageImage
    if (data?.image?.[0]) {
      await handleUpload(data?.image?.[0])
        .then((res) => {
          messageImage = res
        })
        .catch((error) => toast.error(error))
    }

    if ('participants_id' in activeChat!) {
      await handleUpdate('conversations', conversationId, {
        messages: arrayUnion({
          id: uuidv4(),
          content: data.message,
          ...(data?.image?.[0] && { img: messageImage }),
          sender: currentUser?.uid,
          timestamp: Timestamp.now(),
        }),
      }).catch((error) => toast.error(error))
      await handleUpdate('chat-lists', conversationId, {
        lastMessage: watch('message'),
        timestamp: serverTimestamp(),
      }).catch((error) => toast.error(error))
    }
    //if now conversation exists
    else {
      await handleSet('conversations', conversationId, {
        messages: [
          {
            id: uuidv4(),
            content: data.message,
            ...(data?.image?.[0] && { img: messageImage }),
            sender: currentUser?.uid,
            timestamp: Timestamp.now(),
          },
        ],
      })

      const newChatItem = {
        id: uuidv4(),
        displayName: activeChat.displayName as string,
        lastMessage: watch('message'),
        participants_id: [currentUser.uid, activeChat.uid],
        photoURL: activeChat.photoURL as string,
        timestamp: serverTimestamp(),
        uid: activeChat.uid,
      }

      await handleSet('chat-lists', conversationId, newChatItem)

      setActiveChat(newChatItem as unknown as ChatItem)
    }
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex items-center justify-center p-2 bg-main-primary gap-2'
    >
      <InputField
        id='message-input'
        type='text'
        placeholder='Type a message'
        label=''
        disabled={isLoading}
        {...register('message')}
        error={errors?.message}
      />
      <InputFile
        icon={watch('image')?.[0] ? <RiCheckLine /> : <RiAttachmentLine />}
        accept='image/jpg,image/jpeg,image/png,image/webp'
        multiple={false}
        label=''
        className='w-max'
        disabled={isLoading}
        {...register('image')}
        error={errors?.image}
        id='attachment'
      />
      <InputSubmit name='Send' disabled={false} icon={<RiSendPlane2Line />} />
    </form>
  )
}

export default SendMessage
