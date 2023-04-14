import { useInput } from '../src/useInput.js'
import { fireEvent, render, renderHook, screen } from './utils.js'

describe('useInput', () => {
  it('should be defined', () => {
    expect(useInput).toBeDefined()
  })

  it('should be return initial value', () => {
    const { result } = renderHook(() => useInput('name', 'John'))
    expect(result.current.onChange).toBeDefined()
    expect(result.current.name).toBe('name')
    expect(result.current.value).toBe('John')
  })

  it('should be change input value', () => {
    const { result } = renderHook(() => useInput('name', 'John'))
    render(
      <input
        aria-label="input-name"
        type="text"
        {...result}
      />
    )
    const input = screen.getByLabelText<HTMLInputElement>('input-name')
    fireEvent.change(input, { target: { value: 'John Doe' } })
    expect(input.value).toBe('John Doe')
  })
})
