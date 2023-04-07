import { useCallback, useState } from 'react'
import { KeyOf } from './types.js'

/**
 * React hook for managing form state
 * @example
 * const [values, getInput, formReset] = useForm({
 *   name: '',
 *   email: ''
 * })
 * @param initialValues initial values for the form
 */
export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState(initialValues)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues((values) => ({ ...values, [name]: value }))
  }, [])

  const getInput = useCallback(
    <K extends KeyOf<T>>(name: K) => {
      return {
        name,
        value: values[name],
        onChange
      }
    },
    [values]
  )

  const formReset = useCallback(() => {
    setValues(initialValues)
  }, [])

  return [
    values,
    getInput,
    formReset
  ] as const
}
