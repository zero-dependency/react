import { useCallback, useState } from 'react'

/**
 * A hook to handle input `value` and `onChange` event
 * @example
 * const nameInput = useInput('name', 'John Doe')
 * return <input type="text" {...nameInput} />
 * @param name name of the input
 * @param initialValue initial value of the input
 */
export function useInput(name: string, initialValue?: string) {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return {
    name,
    value,
    onChange
  } as const
}
