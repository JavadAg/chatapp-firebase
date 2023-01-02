import SpinnerIcon from '../Loading/SpinnerIcon'
import cn from 'clsx'

interface InputSubmitProps {
  name: string
  disabled: boolean
}

const InputSubmit = (props: InputSubmitProps) => {
  const { name, disabled } = props

  return (
    <label
      htmlFor='submit-input'
      className={cn(
        'relative flex items-center justify-center gap-1.5 bg-purple-200 hover:bg-purple-300 duration-200 ease-in-out rounded-3xl p-1 px-4',
        disabled && 'cursor-not-allowed'
      )}
    >
      <input
        id='submit-input'
        disabled={disabled}
        type='submit'
        value={name}
        className='font-semibold cursor-pointer text-text-primary disabled:cursor-not-allowed'
      />
      {disabled && <SpinnerIcon />}
    </label>
  )
}

export default InputSubmit
