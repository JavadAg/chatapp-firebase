import React from 'react'

interface InputFileProps {
  id: string
  label?: string
  accept?: string
  icon?: JSX.Element
  multiple?: boolean
  files?: File[]
  disabled?: boolean
  error?: string
}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (
    { id, label, accept, icon, multiple, files, disabled, error, ...props },
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
      <div className='flex items-center justify-center w-full gap-1 p-1 bg-main-secondary rounded-2xl'>
        <label
          data-testid='file-input-label'
          className='text-sm text-text-secondary'
          htmlFor={id}
        >
          {labelText()}
        </label>
        <span className='text-2xl text-purple-300'>{icon}</span>
        <input
          data-testid='file-input'
          className='hidden'
          id={id}
          /* name={name} */
          accept={accept}
          type='file'
          multiple={multiple}
          disabled={disabled}
          {...props}
          ref={ref}
        />
        {error && <span className='text-red-500 text-sm'>{error}</span>}
      </div>
    )
  }
)

InputFile.displayName = 'InputFile'

export default InputFile
