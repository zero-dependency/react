import { namedLazy } from '../src/namedLazy.js'
import { render, screen, waitFor } from './utils.js'

describe('namedLazy', () => {
  it('should be defined', () => {
    expect(namedLazy).toBeDefined()
  })

  it('should return a component', async () => {
    const Component = namedLazy(() => import('../mock/App.js'), 'App')
    render(<Component />)
    await waitFor(() =>
      expect(screen.getByText('Hello World!')).toBeInTheDocument()
    )
  })
})
