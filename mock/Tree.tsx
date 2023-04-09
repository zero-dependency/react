import React from 'react'

export function App(props: React.PropsWithChildren) {
  return <div aria-label="app">{props.children}</div>
}

export function Layout(props: React.PropsWithChildren) {
  return <div aria-label="layout">{props.children}</div>
}

type StateProps = React.PropsWithChildren<{
  initialValue: string
}>

export function State(props: StateProps) {
  return (
    <div aria-label="state">
      <h1 aria-label="state-initial-value">{props.initialValue}</h1>
      {props.children}
    </div>
  )
}
