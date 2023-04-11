import React from 'react'

export function App() {
  return <div>This is App</div>
}

type MockProviderProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>

export function MockProvider({ children, ...props }: MockProviderProps) {
  return <div {...props}>{children}</div>
}
