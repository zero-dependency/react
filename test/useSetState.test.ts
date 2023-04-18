import { describe, expect } from 'vitest'
import { useSetState } from '../src/useSetState.js'
import { act, renderHook } from './utils.js'

describe('useSetState', (test) => {
  test('should be defined', () => {
    expect(useSetState).toBeDefined()
  })

  test('should return a state and a setState function', () => {
    const { result } = renderHook(() => useSetState({ foo: 'bar' }))

    expect(result.current[0]).toEqual({ foo: 'bar' })
    expect(typeof result.current[1]).toBe('function')
  })

  test('should update the state', () => {
    const { result } = renderHook(() => useSetState({ foo: 'bar', bar: 'baz' }))

    act(() => result.current[1]({ foo: 'baz' }))
    expect(result.current[0]).toEqual({ foo: 'baz', bar: 'baz' })

    act(() => result.current[1]({ bar: 'foo' }))
    expect(result.current[0]).toEqual({ foo: 'baz', bar: 'foo' })
  })

  test('sets state with state function', () => {
    const hook = renderHook(() => useSetState({ count: 1 }))

    act(() => hook.result.current[1]((state) => ({ count: state.count + 1 })))
    expect(hook.result.current[0]).toStrictEqual({ count: 2 })
  })
})
