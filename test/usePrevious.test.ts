import { describe, expect } from 'vitest'
import { usePrevious } from '../src/usePrevious.js'
import { renderHook } from './utils.js'

describe('usePrevious', (test) => {
  test('should be defined', () => {
    expect(usePrevious).toBeDefined()
  })

  test('should returns undefined on initial render', () => {
    const hook = renderHook(() => usePrevious(1))
    expect(hook.result.current).toBeUndefined()
  })

  test('should returns the previous value after update', () => {
    const hook = renderHook(({ state }) => usePrevious(state), {
      initialProps: { state: 1 }
    })

    hook.rerender({ state: 2 })
    expect(hook.result.current).toBe(1)

    hook.rerender({ state: 4 })
    expect(hook.result.current).toBe(2)
  })
})
