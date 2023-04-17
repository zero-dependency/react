import { createContext } from 'react'
import { useContextProvider } from '../src/useContextProvider.js'
import { renderHook } from './utils.js'

describe('useContextProvider', () => {
  test('should be defined', () => {
    expect(useContextProvider).toBeDefined()
  })

  test('should return the context value', () => {
    const nameContext = createContext('John')
    const { result } = renderHook(() => useContextProvider('Name', nameContext))
    expect(result.current).toBe('John')
  })
})
