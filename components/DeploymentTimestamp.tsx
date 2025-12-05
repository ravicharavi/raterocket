// Build-time timestamp - this gets set during deployment
const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString()

const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString)
  const month = date.toLocaleString('en-US', { month: 'long' })
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  const displayMinute = minute.toString().padStart(2, '0')
  
  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinal = (d: number) => {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }
  
  return `${month} ${day}${getOrdinal(day)}, ${displayHour}:${displayMinute} ${ampm}`
}

export default function DeploymentTimestamp({ className = 'text-purple-300 text-sm' }: { className?: string }) {
  const lastUpdated = formatTimestamp(BUILD_TIME)
  return (
    <p className={className}>
      Most recent deployment: {lastUpdated}
    </p>
  )
}
