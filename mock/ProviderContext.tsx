import React, { useState } from 'react'
import { createProvider } from '../src/createProvider.js'

interface Counter {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}

const [useCounter, CounterProvider] = createProvider<Counter>('Counter')

function Counter() {
  const { count, setCount } = useCounter()

  return (
    <div>
      <h1 aria-label="count">{count}</h1>
      <button
        aria-label="button"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  )
}

export function App() {
  const [count, setCount] = useState(0)

  return (
    <CounterProvider value={{ count, setCount }}>
      <Counter />
    </CounterProvider>
  )
}

export function AppWithError() {
  const counter = useCounter() // ERROR
  const [count, setCount] = useState(0)

  return (
    <CounterProvider value={{ count, setCount }}>
      <Counter />
    </CounterProvider>
  )
}
