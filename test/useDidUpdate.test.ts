import { describe, expect, vi } from 'vitest'
import { useDidUpdate } from '../src/useDidUpdate.js'
import { renderHook } from './utils.js'

describe('useDidUpdate', (test) => {
  test('should be defined', () => {
    expect(useDidUpdate).toBeDefined()
  })

  test('should be called after update', () => {
    let count = 0
    const fn = vi.fn(() => {
      count++
    })

    const { rerender } = renderHook(() => useDidUpdate(fn))
    expect(count).toBe(0)
    rerender()
    expect(count).toBe(1)
  })
})
