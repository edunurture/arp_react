import React from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import {
  cilMagnifyingGlass,
  cilPencil,
  cilTrash,
  cilCloudDownload,
  cilCloudUpload,
  cilPrint,
} from '@coreui/icons'

const BS_COLORS = new Set([
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
])

const FALLBACK_BG = {
  purple: '#6f42c1',
}

// ✅ ARP Table Action Icons (CoreUI)
const ARP_TABLE_ICON = {
  view: cilMagnifyingGlass,
  edit: cilPencil,
  delete: cilTrash,
  download: cilCloudDownload,
  upload: cilCloudUpload,
  print: cilPrint,
}

export default function ArpIconButton({
  // icon keys: view | edit | delete | download | upload | print
  icon,
  color = 'primary',
  size = 40,
  onClick,
  title,
  disabled = false,
  className = '',
}) {
  const isBootstrapColor = BS_COLORS.has(color)

  const style =
    color === 'purple' && !isBootstrapColor
      ? { backgroundColor: FALLBACK_BG.purple, borderColor: FALLBACK_BG.purple }
      : undefined

  const iconSvg = ARP_TABLE_ICON[icon]

  return (
    <button
      type="button"
      className={[
        'btn',
        `btn-${isBootstrapColor ? color : 'primary'}`,
        'btn-sm',
        'rounded-circle',
        'text-white',
        className,
      ].join(' ')}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(style || {}),
      }}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {iconSvg ? <CIcon icon={iconSvg} size="sm" /> : null}
    </button>
  )
}

ArpIconButton.propTypes = {
  icon: PropTypes.oneOf(['view', 'edit', 'delete', 'download', 'upload', 'print']).isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}
