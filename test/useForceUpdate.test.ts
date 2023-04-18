import { describe, expect, vi } from 'vitest'
import { useForceUpdate } from '../src/useForceUpdate.js'
import { act, renderHook } from './utils.js'

describe('useForceUpdate', (test) => {
  test('should be defined', () => {
    expect(useForceUpdate).toBeDefined()
  })

  test('should be called after update', () => {
    let count = 0
    const fn = vi.fn(() => {
      count++
    })

    const { result } = renderHook(() => {
      fn()
      return useForceUpdate()
    })
    expect(count).toBe(1)
    act(() => result.current())
    expect(count).toBe(2)
  })
})
