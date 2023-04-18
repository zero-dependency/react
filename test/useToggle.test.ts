import { describe, expect } from 'vitest'
import { useToggle } from '../src/useToggle.js'
import { act, renderHook } from './utils.js'

describe('useToggle', (test) => {
  test('should be defined', () => {
    expect(useToggle).toBeDefined()
  })

  test('should return a boolean and a function', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current).toEqual([false, expect.any(Function)])
  })

  test('should toggle the value', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current[0]).toBe(true)
    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
  })
})
