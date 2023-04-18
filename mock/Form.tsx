import React from 'react'
import { useForm } from '../src/useForm.js'

export function Form() {
  const [
    value,
    getInput,
    formReset
  ] = useForm({
    name: 'John',
    email: ''
  })

  function formSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }

  return (
    <form onSubmit={formSubmit}>
      <pre aria-label="form-value">{JSON.stringify(value)}</pre>
      <label>
        Name:
        <input
          aria-label="input-name"
          type="text"
          {...getInput('name')}
        />
      </label>
      <label>
        Email:
        <input
          aria-label="input-email"
          type="email"
          {...getInput('email')}
        />
      </label>
      <button
        aria-label="form-submit"
        type="submit"
      >
        Submit
      </button>
      <button
        aria-label="form-reset"
        type="reset"
        onClick={() => formReset()}
      >
        Reset
      </button>
    </form>
  )
}
