import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

interface ErrorProps {
  title: string
}

export const Error: React.FC<ErrorProps> = ({ title }) => {
  return (
    <div className='grid place-items-center'>
      <div className='flex gap-4'>
        <ExclamationCircleIcon className='w-6 h-6 text-red-600' />
        <p>{title}</p>
      </div>
    </div>
  )
}
