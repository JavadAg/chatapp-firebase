import SpinnerIcon from '../Loading/SpinnerIcon'
import cn from 'clsx'

interface InputSubmitProps {
  name: string
  disabled: boolean
  icon?: JSX.Element
}

const InputSubmit = (props: InputSubmitProps) => {
  const { name, disabled, icon } = props

  return (
    <label
      htmlFor='submit-input'
      className={cn(
        'relative flex items-center justify-center gap-1.5 bg-purple-300 hover:bg-purple-400 duration-200 ease-in-out rounded-3xl p-1 px-4',
        disabled && 'cursor-not-allowed'
      )}
    >
      <span className='text-2xl text-white'>{icon}</span>
      <input
        id='submit-input'
        disabled={disabled}
        type='submit'
        value={name}
        className={cn(
          'font-semibold cursor-pointer text-text-primary disabled:cursor-not-allowed',
          icon && 'hidden'
        )}
      />
      {disabled && <SpinnerIcon />}
    </label>
  )
}

export default InputSubmit
