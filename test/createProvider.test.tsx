import { App, AppWithError } from '../mock/ProviderContext.js'
import { createProvider } from '../src/createProvider.js'
import { fireEvent, render, screen } from './utils.js'

describe('createProvider', () => {
  it('should be defined', () => {
    expect(createProvider).toBeDefined()
  })

  it('should return an array', () => {
    const [
      useFoo,
      FooProvider,
      FooConsumer
    ] = createProvider('Foo')

    expect(useFoo).toBeDefined()
    expect(FooProvider).toBeDefined()
    expect(FooConsumer).toBeDefined()
  })

  it('should render the app', () => {
    render(<App />)
    const count = screen.getByLabelText('count')
    const button = screen.getByLabelText('button')

    expect(count).toHaveTextContent('0')
    expect(button).toHaveTextContent('Increment')

    fireEvent.click(button)
    expect(count).toHaveTextContent('1')
  })

  it('should throw an error if used outside of a provider', () => {
    expect(() => render(<AppWithError />)).toThrowErrorMatchingSnapshot()
  })
})
