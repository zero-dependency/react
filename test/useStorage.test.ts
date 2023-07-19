import { useLocalStorage } from '../src/useLocalStorage.js'
import { useSessionStorage } from '../src/useSessionStorage.js'
import { useWebStorage } from '../src/useWebStorage.js'
import { act, renderHook } from './utils.js'

describe('useStorage', () => {
  it('should be defined', () => {
    expect(useWebStorage).toBeDefined()
    expect(useLocalStorage).toBeDefined()
    expect(useSessionStorage).toBeDefined()
  })

  it('should be render hook', () => {
    renderHook(() => useSessionStorage('foo', 'bar'))
    const { result } = renderHook(() => useLocalStorage('foo', 'bar'))
    expect(result.current[0]).toBe('bar') // value
    act(() => result.current[1].setStorage((prevValue) => prevValue + 'baz')) // set
    expect(result.current[0]).toBe('barbaz') // value
    act(() => result.current[1].setStorage('foo')) // set
    expect(result.current[0]).toBe('foo') // value
    act(() => result.current[1].resetStorage()) // reset
    expect(result.current[0]).toBe('bar') // value
  })
})
