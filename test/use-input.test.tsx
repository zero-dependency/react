import { useInput } from '../src/use-input.js'
import { fireEvent, render, renderHook, screen } from './utils.js'

describe('useInput', () => {
  it('should be defined', () => {
    expect(useInput).toBeDefined()
  })

  it('should be return initial value', () => {
    const { result } = renderHook(() => useInput('initial value'))
    expect(result.current[0]).toBe('initial value')
  })

  it('should be change input value', () => {
    const { result } = renderHook(() => useInput(''))
    render(
      <input
        aria-label="input-text"
        type="text"
        {...result}
      />
    )
    const input = screen.getByLabelText<HTMLInputElement>('input-text')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
  })
})
