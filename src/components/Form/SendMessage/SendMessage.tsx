import InputField from '@/components/Ui/Input/InputField'
import InputFile from '@/components/Ui/Input/InputFile'
import InputSubmit from '@/components/Ui/Input/InputSubmit'
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
import { ChatItem, Participants } from '@/types/chat.types'
import { User, UserInfo } from 'firebase/auth'
import { useFirestore } from '@/hooks/useFirestore'

const SendMessage = ({
  conversationId,
  targetUser,
}: {
  conversationId: string
  targetUser: Participants
}) => {
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
    setIsLoading(true)
    let messageImage
    if (data?.image?.[0]) {
      await handleUpload(data?.image?.[0])
        .then((res) => {
          messageImage = res
        })
        .catch((error) => {
          toast.error(error)
          setIsLoading(false)
        })
    }

    if ('lastMessage' in activeChat!) {
      await handleUpdate('conversations', conversationId, {
        messages: arrayUnion({
          id: uuidv4(),
          content: data.message,
          ...(data?.image?.[0] && { img: messageImage }),
          sender: currentUser?.uid,
          timestamp: Timestamp.now(),
        }),
      }).catch((error) => {
        toast.error(error)
        setIsLoading(false)
      })
      await handleUpdate('chat-lists', conversationId, {
        lastMessage: watch('message'),
        timestamp: serverTimestamp(),
      }).catch((error) => {
        toast.error(error)
        setIsLoading(false)
      })
      setIsLoading(false)
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
      }).catch((error) => {
        toast.error(error)
        setIsLoading(false)
      })

      const newChatItem = {
        id: uuidv4(),
        lastMessage: watch('message'),
        participants: [
          {
            uid: currentUser.uid,
            displayName: currentUser.displayName as string,
            photoURL: currentUser.photoURL as string,
          },
          {
            uid: targetUser.uid,
            displayName: targetUser.displayName as string,
            photoURL: targetUser.photoURL as string,
          },
        ],
        timestamp: serverTimestamp(),
      }

      await handleSet('chat-lists', conversationId, newChatItem).catch(
        (error) => {
          toast.error(error)
          setIsLoading(false)
        }
      )

      setActiveChat(newChatItem as unknown as ChatItem)
    }
    reset()
    setIsLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex items-center justify-center w-full gap-2 p-2 bg-main-secondary rounded-3xl dark:bg-main-dark-secondary'
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
      <InputSubmit
        name='Send'
        disabled={isLoading}
        icon={<RiSendPlane2Line />}
      />
    </form>
  )
}

export default SendMessage
