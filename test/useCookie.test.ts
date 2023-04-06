import { useCookie } from '../src/useCookie.js'
import { act, renderHook } from './utils.js'

interface Cookie {
  theme: 'dark' | 'light'
}

describe('useCookie', () => {
  it('should be defined', () => {
    expect(useCookie).toBeDefined()
  })

  it('should be render hook', () => {
    const { result } = renderHook(() => useCookie<Cookie>())
    expect(result.current[0].theme).toBeUndefined()
    act(() => result.current[1]('theme', 'dark'))
    expect(result.current[0].theme).toBe('dark')
    act(() => result.current[2]('theme'))
    expect(result.current[0].theme).toBeUndefined()
  })
})
