import useSwr from 'swr'

interface SegmentProps {
  title: string
  endpoint: string
}

export const Segment: React.FC<SegmentProps> = ({ title, endpoint }) => {
  const { data, error } = useSwr(endpoint, { suspense: true })

  return <div></div>
}
