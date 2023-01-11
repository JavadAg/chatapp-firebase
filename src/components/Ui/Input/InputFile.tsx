import React from 'react'
import { FieldError, Merge } from 'react-hook-form'
import cn from 'clsx'
interface InputFileProps {
  id: string
  label?: string
  accept?: string
  icon?: JSX.Element
  className?: string
  multiple?: boolean
  files?: File[]
  disabled?: boolean
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined
}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (
    {
      id,
      label,
      accept,
      icon,
      multiple,
      className,
      files,
      disabled,
      error,
      ...props
    },
    ref
  ) => {
    const labelText = () => {
      if (files) {
        if (files.length > 0) {
          return files[0].name
        } else {
          return label
        }
      } else {
        return label
      }
    }
    return (
      <div
        className={cn(
          'flex items-center justify-center w-full gap-1 p-1 bg-main-secondary rounded-2xl cursor-pointer dark:bg-main-dark-secondary',
          className
        )}
      >
        <label
          className='flex items-center justify-center text-sm text-text-secondary md:text-base dark:text-text-dark-secondary'
          htmlFor={id}
        >
          {labelText()}
          {icon && (
            <span className='text-2xl text-purple-300 cursor-pointer hover:text-purple-400 dark:text-purple-400/60 dark:hover:text-purple-500/60'>
              {icon}
            </span>
          )}
        </label>
        <input
          className='hidden'
          id={id}
          accept={accept}
          type='file'
          multiple={multiple}
          disabled={disabled}
          {...props}
          ref={ref}
        />
        {error && (
          <span className='text-sm text-red-500 md:text-base'>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)

InputFile.displayName = 'InputFile'

export default InputFile
