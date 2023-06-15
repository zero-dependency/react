import { useCallback, useState } from 'react'

/**
 * Returns a tuple containing a boolean value and a function that toggles
 * its value. The initial boolean value defaults to false if not provided.
 *
 * @param {boolean} [initialValue=false]
 * The initial value of the boolean.
 *
 * @return {readonly [boolean, () => void]}
 * A tuple containing the boolean value and a function that toggles its value.
 */
export function useToggle(
  initialValue: boolean = false
): readonly [value: boolean, toggle: () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((value) => !value)
  }, [])

  return [value, toggle] as const
}
