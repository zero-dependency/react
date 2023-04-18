import { afterEach, describe } from 'vitest'
import { useCookie } from '../src/useCookie.js'
import { act, renderHook } from './utils.js'

interface Cookie {
  theme: 'dark' | 'light'
  lang: string
}

afterEach(() => {
  const { result } = renderHook(() => useCookie())
  for (const cookieName of Object.keys(result.current[0])) {
    act(() => result.current[2](cookieName))
  }
})

describe('useCookie', (test) => {
  test('should be defined', () => {
    expect(useCookie).toBeDefined()
  })

  test('should be render hook', () => {
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

  test('should be render hook with initial value', () => {
    const { result } = renderHook(() =>
      useCookie<Cookie>({
        initialValue: {
          theme: 'light',
          lang: 'en'
        }
      })
    )
    expect(result.current[0].theme).toBe('light')
    expect(result.current[0].lang).toBe('en')
  })
})
