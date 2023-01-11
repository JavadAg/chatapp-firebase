import React, { useCallback, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'

interface InputFieldProps {
  id: string
  label?: React.ReactNode
  type?: 'email' | 'password' | 'search' | 'text'
  placeholder?: string
  minLength?: number
  maxLength?: number
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  error?: FieldError | undefined
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      minLength,
      maxLength,
      onChange,
      required,
      disabled,
      error,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const computedType = useCallback(() => {
      if (type === 'password' && showPassword) {
        return 'text'
      }
      return type
    }, [showPassword, type])

    return (
      <div className='flex flex-col items-center justify-center w-full gap-1'>
        {label ? (
          <label
            htmlFor={id}
            className='self-start text-sm font-semibold md:text-base'
          >
            {label}
          </label>
        ) : null}
        <div className='relative flex items-center justify-center w-full gap-1'>
          <input
            className='w-full h-8 px-2 text-sm outline-none rounded-3xl placeholder:text-text-secondary/50 focus:outline-purple-200 md:text-base dark:placeholder:text-text-dark-secondary/50 dark:bg-main-dark-secondary focus:dark:outline-purple-600 outline-offset-0'
            id={id}
            autoComplete='off'
            minLength={minLength}
            maxLength={maxLength}
            onChange={onChange}
            type={computedType()}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...props}
            ref={ref}
          />
          {type === 'password' && (
            <button
              type='button'
              className='absolute text-purple-300 right-1.5'
              aria-label='Reveal Password'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
            </button>
          )}
        </div>
        {error && (
          <span className='text-sm text-red-500 md:text-base'>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'

export default InputField
