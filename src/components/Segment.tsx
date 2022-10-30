import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import useSwr from 'swr'
import { ErrorResponse } from '../../server'
import { Error } from './Error'
import { Loading } from './Loading'

export interface Segment {
  name: string
  score: number
}

interface SegmentProps {
  title: string
  endpoint: string
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  if (res.ok) {
    return res.json()
  } else {
    throw new (Error as any)('Fetch Failed!')
  }
}

export const Segment: React.FC<SegmentProps> = ({ title, endpoint }) => {
  const { data, error } = useSwr<Segment[], ErrorResponse>(endpoint, fetcher, {
    suspense: true,
  })

  console.log('data', data)

  return (
    <article className='bg-white p-3 rounded-lg shadow-md'>
      <h2 className='font-semibold text-slate-700'>{title}</h2>
      <ul>
        {data?.length &&
          data.map(({ name, score }) => (
            <li key={name}>
              {name}: {score}
            </li>
          ))}
      </ul>
    </article>
  )
}
