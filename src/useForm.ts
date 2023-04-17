import { useCallback, useState } from 'react'
import { KeyOf } from './types.js'

/**
 * React hook for managing form state
 * @param initialValue initial value for the form
 * @example
 * const [value, getInput, formReset] = useForm({
 *   name: '',
 *   email: ''
 * })
 */
export function useForm<T extends Record<string, string>>(initialValue: T) {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValue((prevValue) => ({ ...prevValue, [name]: value }))
  }, [])

  const getInput = useCallback(
    <K extends KeyOf<T>>(name: K) => {
      return {
        name,
        value: value[name],
        onChange
      }
    },
    [value]
  )

  const formReset = useCallback(() => {
    setValue(initialValue)
  }, [])

  return [
    value,
    getInput,
    formReset
  ] as const
}
