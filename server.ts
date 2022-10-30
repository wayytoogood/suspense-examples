import { createServer, Registry, Response, Server } from 'miragejs'
import { AnyFactories, AnyModels } from 'miragejs/-types'

export interface ErrorResponse {
  status: number
  message: string
}

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    timing: 750,

    routes() {
      this.namespace = 'api'

      this.get(
        '/movies',
        () => {
          // Force an error
          // return new Response(500)

          return [
            { name: 'Revolver', score: 9.2 },
            { name: 'Last Samurai', score: 8.5 },
            { name: 'Manchester By Sea', score: 3 },
          ]
        },
        { timing: 500 }
      )

      this.get(
        '/sitcoms',
        () => {
          return [
            { name: 'Friends', score: 9.5 },
            { name: 'Brooklyn Nine Nine', score: 8.5 },
            { name: 'Super Store', score: 8.2 },
          ]
        },
        { timing: 1500 }
      )

      this.get(
        '/games',
        () => {
          return [
            { name: 'Witcher', score: 10 },
            { name: 'Age of Empires 2', score: 10 },
            { name: 'Big Bad Wolf', score: 9.2 },
          ]
        },
        { timing: 750 }
      )

      this.namespace = ''
      this.passthrough()
    },
  })

  // Don't log passthrough
  server.pretender.passthroughRequest = () => {}

  server.logging = false

  return server
}

interface WindowWithServer extends Window {
  server: Server<Registry<AnyModels, AnyFactories>>
}

const windowWithServer = window as WindowWithServer & typeof globalThis

let isClient = typeof windowWithServer !== 'undefined'

if (isClient && !windowWithServer.server) {
  windowWithServer.server = makeServer({ environment: 'development' })
}
