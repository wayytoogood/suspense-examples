import './App.css'
// import '../server'
import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Segment } from './components/Segment'
import { Loading } from './components/Loading'
import { Error } from './components/Error'

const ROOT_API = 'http://localhost:3000'

function App() {
  return (
    <main className='min-h-screen bg-slate-100'>
      <section className='h-full grid place-items-center gap-6 py-8'>
        <ErrorBoundary fallback={<Error title='Could not fetch the data' />}>
          <Suspense fallback={<Loading />}>
            <Segment title='Movie Ranking' endpoint={`${ROOT_API}/movies`} />
            <Segment title='Sitcom Ranking' endpoint={`${ROOT_API}/sitcoms`} />
            <Segment title='Game Ranking' endpoint={`${ROOT_API}/games`} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  )
}

export default App
