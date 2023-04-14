import { useCookie } from '../src/useCookie.js'
import { act, renderHook } from './utils.js'

interface Cookie {
  theme: 'dark' | 'light'
  lang: string
}

describe('useCookie', () => {
  it('should be defined', () => {
    expect(useCookie).toBeDefined()
  })

  it('should be render hook', () => {
    const { result } = renderHook(() => useCookie<Cookie>())
    expect(result.current[0].theme).toBeUndefined()

    // set cookie
    act(() => result.current[1]('theme', 'dark'))
    act(() => result.current[1]('theme', 'dark'))

    // get cookie
    expect(result.current[3]('theme')).toBe('dark')
    expect(result.current[0].theme).toBe('dark')

    // remove cookie
    act(() => result.current[2]('lang'))
    act(() => result.current[2]('theme'))

    // get cookie
    expect(result.current[0].theme).toBeUndefined()
    expect(result.current[0].lang).toBeUndefined()
  })
})
