import React from 'react'

export function LoadingIndicator({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}
