import { useCallback, useState } from 'react'

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  return [value, onChange] as const
}
