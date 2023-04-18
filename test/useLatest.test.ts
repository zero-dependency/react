import { describe, expect } from 'vitest'
import { useLatest } from '../src/useLatest.js'
import { renderHook } from './utils.js'

describe('useLatest', (test) => {
  test('should be defined', () => {
    expect(useLatest).toBeDefined()
  })

  test('should returns the latest value after update', () => {
    const hook = renderHook(({ state }) => useLatest(state), {
      initialProps: { state: 1 }
    })

    hook.rerender({ state: 2 })
    expect(hook.result.current).toEqual({ current: 2 })

    hook.rerender({ state: 4 })
    expect(hook.result.current).toEqual({ current: 4 })
  })
})
