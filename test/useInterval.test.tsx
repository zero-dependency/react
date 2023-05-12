import { describe, expect } from 'vitest'
import { useInterval } from '../src/useInterval.js'
import { renderHook, waitFor } from './utils.js'

describe('useInterval', (test) => {
  test('should be defined', () => {
    expect(useInterval).toBeDefined()
  })

  test('should returns the previous value after update', async () => {
    const fn = vi.fn()
    const hook = renderHook(() => useInterval(() => fn(), 100))

    hook.rerender()
    await waitFor(() => expect(fn.mock.calls).toHaveLength(2))
    hook.unmount()
    expect(fn.mock.calls).toHaveLength(2)
  })
})
