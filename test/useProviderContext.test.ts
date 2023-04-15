import { createContext } from 'react'
import { useProviderContext } from '../src/useProviderContext.js'
import { renderHook } from './utils.js'

describe('useProviderContext', () => {
  test('should be defined', () => {
    expect(useProviderContext).toBeDefined()
  })

  test('should return the context value', () => {
    const nameContext = createContext('John')
    const { result } = renderHook(() => useProviderContext('Name', nameContext))
    expect(result.current).toBe('John')
  })
})
