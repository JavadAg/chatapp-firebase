import { debounce } from 'lodash'
import { useCallback } from 'react'

export const useDebounce = (
  fnToDebounce: (value: string) => void,
  duration = 500
) => {
  return useCallback(debounce(fnToDebounce, duration), [fnToDebounce, duration])
}
