import { useEffect, useState } from 'react'
import { Logger } from '@zero-dependency/utils'
import { createProvider } from './createProvider.js'
import { useDidUpdate } from './useDidUpdate.js'
import type { DependencyList } from 'react'

const [getLogger, Provider] = createProvider<Logger>('Logger')

type LoggerProviderProps = React.PropsWithChildren<{
  prefix: string
}>

export function useLogger(): Logger {
  return getLogger()
}

export function useLoggerWithDeps(name: string, deps: DependencyList) {
  const logger = useLogger()

  useEffect(() => {
    logger.info(`${name} mounted`, ...deps)
    return () => logger.info(`${name} unmounted`)
  }, [])

  useDidUpdate(() => {
    logger.info(`${name} updated`, ...deps)
  }, deps)
}

export function LoggerProvider(props: LoggerProviderProps): JSX.Element {
  const [logger] = useState(() => new Logger(props.prefix))
  return <Provider value={logger}>{props.children}</Provider>
}
