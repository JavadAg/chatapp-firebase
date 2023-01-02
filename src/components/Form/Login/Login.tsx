import { useEffect, useState } from 'react'
import InputField from '../../Ui/Input/InputField'
import InputFile from '../../Ui/Input/InputFile'
import ChattyLogo from '@/assets/svg/logo.svg'
import Logo from '@/components/Ui/Logo/Logo'
import { RiUser4Line } from 'react-icons/ri'
import InputSubmit from '@/components/Ui/Input/InputSubmit'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidationSchema, validationSchema } from '@/utils/validateSchema'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { handleAuth, isLoading } = useAuth()

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (isLogin) {
      setValue('name', 'test')
    } else {
      setValue('name', '')
    }
  }, [isLogin])

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    await handleAuth({ data, isLogin })
      .then((user) => {
        toast.success(user.email)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  const handleAuthSwitch = () => {
    setIsLogin((prev) => !prev)
  }

  return (
    <div className='flex flex-col items-center justify-center gap-6 p-4 mx-2 bg-main-primary rounded-2xl w-96'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Logo src={ChattyLogo} alt='chatty-logo' />
        <h1 className='text-xl font-bold'>Welcome to Chatty</h1>
        <span className='text-sm text-center text-text-secondary'>
          {isLogin
            ? 'Enter the information you entered while registering'
            : 'Enter the information'}
        </span>
      </div>

      <form
        data-testid='auth-form'
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center w-full gap-4'
      >
        <InputField
          id='email-input'
          type='email'
          placeholder='john@doe.com'
          maxLength={30}
          label='Email'
          disabled={isLoading}
          {...register('email')}
          error={errors?.email?.message}
        />
        {!isLogin && (
          <InputField
            id='name-input'
            type='text'
            placeholder='John Doe'
            minLength={1}
            maxLength={30}
            label='Name'
            disabled={isLoading}
            {...register('name')}
            error={errors?.name?.message}
          />
        )}

        <InputField
          id='password-input'
          type='password'
          placeholder='@#!$werwgr1234'
          minLength={4}
          maxLength={16}
          label='Password'
          disabled={isLoading}
          {...register('password')}
          error={errors?.password?.message}
        />
        {!isLogin && (
          <InputFile
            id='file-input'
            icon={<RiUser4Line />}
            accept='image/jpg,image/jpeg,image/png,image/webp'
            multiple={false}
            label='Select avatar'
            disabled={isLoading}
            files={watch('avatar')}
            {...register('avatar')}
            error={errors?.avatar?.message}
          />
        )}
        {isLogin && (
          <a className='self-end text-xs cursor-not-allowed text-text-secondary/70'>
            Forgot password?
          </a>
        )}
        <InputSubmit
          name={isLogin ? 'Login' : 'Register'}
          disabled={isLoading}
        />
      </form>
      <button className='text-sm' onClick={handleAuthSwitch}>
        {isLogin ? (
          <span>
            Dont have an account ?{' '}
            <span className='text-purple-500 duration-200 hover:text-purple-700'>
              Register now
            </span>
          </span>
        ) : (
          <span>
            Have an account ?{' '}
            <span className='text-purple-500 duration-200 hover:text-purple-700'>
              Login now
            </span>
          </span>
        )}
      </button>
    </div>
  )
}

export default Login
