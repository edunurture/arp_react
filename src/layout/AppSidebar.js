import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  CCloseButton,
  CSidebar,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

import { AppSidebarNav } from '../components/AppSidebarNav'
import navigation from '../navigation/nav.arp'

import companyLogo from 'src/assets/brand/company-logo.png'
import companySygnet from 'src/assets/brand/company-sygnet.png'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // Desktop vs Mobile (CoreUI breakpoint lg ~ 992px)
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 991.98px)').matches
  }, [])

  // For docking type sidebar:
  // - Desktop: always visible (never hide)
  // - Mobile: controlled by sidebarShow (can hide/show)
  const visible = isMobile ? sidebarShow : true

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={visible}
      // IMPORTANT: only update sidebarShow on mobile
      onVisibleChange={(v) => {
        if (isMobile) dispatch({ type: 'set', sidebarShow: v })
      }}
    >
      <CSidebarHeader className="border-bottom" style={{ minHeight: '72px' }}>
        <div
          className="w-100 d-flex align-items-center justify-content-center"
          style={{ padding: '10px 8px' }}
        >
          <Link
            to="/dashboard"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img
              src={unfoldable ? companyLogo : companySygnet}
              alt="Company Logo"
              style={{
                maxWidth: unfoldable ? '140px' : '28px',
                maxHeight: '40px',
                height: 'auto',
              }}
            />
          </Link>
        </div>

        <CCloseButton
          className="d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* Search */}
      <div className="px-3 py-2 border-bottom arp-sidebar-search">
        <CInputGroup size="sm">
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
          <CFormInput placeholder="Search..." />
        </CInputGroup>
      </div>

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        {/* Desktop docking toggler (icons-only vs full) */}
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
