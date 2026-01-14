// src/components/common/IconCircleButton.jsx
import React from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'

/**
 * Circle icon button.
 * Props:
 * - color: 'primary' | 'success' | 'danger' | ...
 * - icon: coreui icon (e.g., cilPencil)
 * - title: tooltip text
 */
export default function IconCircleButton({
  color = 'primary',
  icon,
  title,
  onClick,
  disabled = false,
  size = 'sm',
  className = '',
  variant = 'solid', // 'solid' | 'outline'
}) {
  const btnVariantProps = variant === 'outline' ? { variant: 'outline' } : {}

  return (
    <CButton
      color={color}
      size={size}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`d-inline-flex align-items-center justify-content-center rounded-circle ${className}`}
      style={{ width: 34, height: 34, padding: 0 }}
      {...btnVariantProps}
    >
      <CIcon icon={icon} />
    </CButton>
  )
}
