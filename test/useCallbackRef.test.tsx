import { describe, expect } from 'vitest'
import { useCallbackRef } from '../src/useCallbackRef.js'
import { renderHook } from './utils.js'

describe('useCallbackRef', (test) => {
  test('should be defined', () => {
    expect(useCallbackRef).toBeDefined()
  })

  test('return same callback instance, but dependencies should be updated', () => {
    const { result, rerender } = renderHook(
      (value) => useCallbackRef(() => value),
      { initialProps: 1 }
    )

    const fn1 = result.current
    expect(fn1()).toBe(1)
    rerender(2)

    const fn2 = result.current
    expect(fn2()).toBe(2)
    expect(fn1).toBe(fn2)
  })
})
