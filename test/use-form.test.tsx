import { Form } from '../mock/Form.js'
import { useForm } from '../src/use-form.js'
import { fireEvent, render, renderHook, screen } from './utils.js'

describe('useForm', () => {
  it('should be defined', () => {
    expect(useForm).toBeDefined()
  })

  it('should be render hook', () => {
    const { result } = renderHook(() => useForm({}))
    expect(result.current.values).toBeDefined()
    expect(result.current.getInput).toBeDefined()
    expect(result.current.formReset).toBeDefined()
  })

  it('should be render form', () => {
    render(<Form />)
    const values = screen.getByLabelText('form-values')
    const name = screen.getByLabelText<HTMLInputElement>('input-name')
    const email = screen.getByLabelText<HTMLInputElement>('input-email')
    const submit = screen.getByLabelText<HTMLButtonElement>('form-submit')
    const reset = screen.getByLabelText<HTMLInputElement>('form-reset')

    expect(name).toBeDefined()
    expect(email).toBeDefined()
    expect(submit).toBeDefined()

    // initial values
    expect(name.value).toBe('John')
    expect(email.value).toBe('')

    // change
    fireEvent.change(name, { target: { value: 'John Doe' } })
    fireEvent.change(email, { target: { value: 'foo@bar.com' } })
    expect(name.value).toBe('John Doe')
    expect(email.value).toBe('foo@bar.com')

    // submit
    fireEvent.click(submit)
    expect(values.textContent).toBe('{"name":"John Doe","email":"foo@bar.com"}')

    // reset
    fireEvent.click(reset)
    expect(name.value).toBe('John')
    expect(email.value).toBe('')
  })
})