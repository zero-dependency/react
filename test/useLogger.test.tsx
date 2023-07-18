import { describe, expect, vi } from 'vitest'
import { browserPrefix } from '../../utils/src/logger/browser.js'
import {
  LoggerProvider,
  useLogger,
  useLoggerWithDeps
} from '../src/useLogger.js'
import { renderHook } from './utils.js'

const prefix = 'Zero Dependency'
const styles = browserPrefix(prefix, 'info')

const wrapper = (props: React.PropsWithChildren) => (
  <LoggerProvider prefix={prefix}>{props.children}</LoggerProvider>
)

describe('useLogger', (test) => {
  test('should be defined', () => {
    expect(LoggerProvider).toBeDefined()
    expect(useLogger).toBeDefined()
    expect(useLoggerWithDeps).toBeDefined()
  })

  test('logs mount and unmount events', () => {
    const info = vi.spyOn(console, 'info')

    const counter = { value: 0 }
    const hook = renderHook(() => useLoggerWithDeps('Counter', [counter]), {
      wrapper
    })

    expect(info).toHaveBeenCalledWith(...styles, 'Counter mounted', counter)
    hook.unmount()
    expect(info).toHaveBeenLastCalledWith(...styles, 'Counter unmounted')
    expect(info).toHaveBeenCalledTimes(2)
    info.mockRestore()
  })
})
