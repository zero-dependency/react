import { useCallback, useState } from 'react'

export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState(initialValues)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues((values) => ({ ...values, [name]: value }))
  }, [])

  const getInput = useCallback(
    (name: keyof T) => {
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

  return { values, getInput, formReset } as const
}
