# @zero-dependency/react

[![npm version](https://img.shields.io/npm/v/@zero-dependency/react)](https://npm.im/@zero-dependency/react)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@zero-dependency/react)](https://bundlephobia.com/package/@zero-dependency/react@latest)
![npm license](https://img.shields.io/npm/l/@zero-dependency/react)

## Installation

```sh
npm install @zero-dependency/react
```

```sh
yarn add @zero-dependency/react
```

```sh
pnpm add @zero-dependency/react
```

## Usage

```tsx
import { namedLazy, useInput, useForm } from '@zero-dependency/react'

// React.lazy
const LazyComponent = namedLazy(() => import('./LazyComponent'), 'LazyComponent')

// forms
function NameInput() {
  const name = useInput('')
  return <input type="text" {...name} />
}

function Form() {
  const { values, getInput, formReset } = useForm({ name: '' })

  function formSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    // do something with values
    formReset()
  }

  return (
    <form onSubmit={formSubmit}>
      <input type="text" {...getInput('name')} />
      <button type="submit">
        Submit
      </button>
    </form>
  )
}
```
