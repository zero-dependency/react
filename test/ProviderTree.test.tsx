import { App, MockProvider } from '../mock/ProviderTree.js'
import { ProviderTree } from '../src/ProviderTree.js'
import { render } from './utils.js'

describe('ProviderTree', () => {
  it('should be defined', () => {
    expect(ProviderTree).toBeDefined()
  })

  it('should render the tree of providers', () => {
    const { container } = render(
      <ProviderTree
        providers={($) => [
          $(MockProvider, { id: 'foo' }),
          $(MockProvider, { id: 'bar' })
        ]}
      >
        <App />
      </ProviderTree>
    )
    expect(container).toMatchSnapshot()
  })

  it('should render the tree of providers without props', () => {
    const { container } = render(
      ProviderTree({
        providers: ($) => [$(MockProvider), $(MockProvider)]
      })
    )

    expect(container).toMatchSnapshot()
  })

  it('should render the tree of providers with a single provider', () => {
    const { container } = render(
      ProviderTree({
        providers: ($) => [$(MockProvider, { id: 'single' })]
      })
    )

    expect(container).toMatchSnapshot()
  })

  it('should be expect error when no providers are provided', () => {
    expect(() =>
      render(
        ProviderTree({
          providers: ($) => []
        })
      )
    ).toThrowErrorMatchingSnapshot()
  })
})
