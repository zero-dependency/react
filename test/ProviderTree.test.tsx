import { App, MockProvider } from '../mock/ProviderTree.js'
import { ProviderTree } from '../src/ProviderTree.js'
import { render } from './test-utils.js'

describe('ProviderTree', () => {
  it('should be defined', () => {
    expect(ProviderTree).toBeDefined()
  })

  it('should render the tree of providers', () => {
    const { container } = render(
      <ProviderTree
        providers={[
          [MockProvider, { id: 'foo' }],
          [MockProvider, { id: 'bar' }]

        ]}
      >
        <App />
      </ProviderTree>
    )
    expect(container).toMatchSnapshot()
  })

  it('should render the tree of providers without props', () => {
    const { container } = render(
      <ProviderTree providers={[[MockProvider]]}>
        <App />
      </ProviderTree>
    )

    expect(container).toMatchSnapshot()
  })
})
