import React from 'react'

const AvatarButton = ({ onClick, emoji = '👤', size = 40, ariaLabel = 'Open profile' }) => {
  return (
    <button onClick={onClick} aria-label={ariaLabel} style={{
      width: size, height: size, borderRadius: '50%', border: '1px solid var(--color-border)',
      background: 'var(--color-surface)', display: 'grid', placeItems: 'center', cursor: 'pointer'
    }}>
      {emoji}
    </button>
  )
}

export default AvatarButton


