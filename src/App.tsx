import './App.css'
import '../server'
import { useEffect } from 'react'

function App() {
  const getMovies = async () => {
    const res = await fetch('api/sitcoms')
    const data = await res.json()

    console.log(data)
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <main className='min-h-screen bg-slate-100'>
      <section className='h-full grid place-items-center'></section>
    </main>
  )
}

export default App
