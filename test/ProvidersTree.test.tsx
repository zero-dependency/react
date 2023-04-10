import { App, Layout, State } from '../mock/Tree.js'
import { ProvidersTree } from '../src/ProvidersTree.js'
import { render, screen } from './utils.js'

describe('ProvidersTree', () => {
  it('should be defined', () => {
    expect(ProvidersTree).toBeDefined()
  })

  it('should be render component tree with children', () => {
    render(
      <ProvidersTree
        providers={(wrapper) => [
          wrapper(State, { initialValue: 'hello' }),
          wrapper(Layout)
        ]}
      >
        <App />
      </ProvidersTree>
    )
    expect(screen.getByLabelText('state')).toMatchSnapshot()
  })

  it('should be render component tree without children', () => {
    render(
      ProvidersTree({
        providers(wrapper) {
          return [
            wrapper(State, { initialValue: 'hello' }),
            wrapper(Layout),
            wrapper(App)]
        }
      })
    )

    expect(screen.getByLabelText('state')).toMatchSnapshot()
  })
})
