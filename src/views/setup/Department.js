import React, { useMemo, useState, useRef, useEffect } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

import { ArpButton, ArpIconButton } from '../../components/common'

const initialForm = {
  deptCode: '',
  deptName: '',
  estYear: '',
  nbaAccredited: '',
  objectives: '',
  vision: '',
  mission: '',
  goal: '',
}

const Department = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [selectedCode, setSelectedCode] = useState('MCA')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(initialForm)

  // Table UX state
  const [sort, setSort] = useState({ key: 'deptCode', dir: 'asc' })
  const [page, setPage] = useState(1) // 1-based
  const [pageSize, setPageSize] = useState(10)
  const [loading] = useState(false)

  const fileRef = useRef(null)

  const years = useMemo(() => {
    const current = new Date().getFullYear()
    const arr = []
    for (let y = 2000; y <= current; y++) arr.push(String(y))
    return arr
  }, [])

  // Sample data (replace with API later)
  const [rows] = useState([
    {
      deptCode: 'MCA',
      deptName: 'Master of Computer Applications',
      estYear: '2016',
      nbaAccredited: 'Yes',
      objectives: 'XXX - XXX',
      vision: 'XXX - XXX',
      mission: 'XXX - XXX',
      goal: 'XXX - XXX',
    },
    {
      deptCode: 'M.Com',
      deptName: 'Master of Commerce',
      estYear: '2016',
      nbaAccredited: 'No',
      objectives: 'XXX - XXX',
      vision: 'XXX - XXX',
      mission: 'XXX - XXX',
      goal: 'XXX - XXX',
    },
  ])

  // Filter + Sort + Pagination
  const normalize = (v) =>
    String(v ?? '')
      .toLowerCase()
      .trim()

  const sortToggle = (key) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: 'asc' }
      return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
    })
  }

  const sortIndicator = (key) => {
    if (sort.key !== key) return ''
    return sort.dir === 'asc' ? ' ▲' : ' ▼'
  }

  const filteredSorted = useMemo(() => {
    const q = normalize(search)
    let data = rows

    if (q) {
      data = rows.filter((r) => {
        const hay = Object.values(r).map(normalize).join(' ')
        return hay.includes(q)
      })
    }

    const { key, dir } = sort || {}
    if (!key) return data

    const sorted = [...data].sort((a, b) =>
      normalize(a?.[key]).localeCompare(normalize(b?.[key]), undefined, { sensitivity: 'base' }),
    )

    return dir === 'asc' ? sorted : sorted.reverse()
  }, [rows, search, sort])

  // Reset to page 1 when search or pageSize changes
  useEffect(() => {
    setPage(1)
  }, [search, pageSize])

  const total = filteredSorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)

  const startIdx = total === 0 ? 0 : (safePage - 1) * pageSize
  const endIdx = Math.min(startIdx + pageSize, total)

  const pageRows = useMemo(
    () => filteredSorted.slice(startIdx, endIdx),
    [filteredSorted, startIdx, endIdx],
  )

  // Form actions
  const onChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const onAddNew = () => {
    setSelectedCode(null)
    setForm(initialForm)
    setIsEdit(true)
  }

  const onView = () => {
    const selected = rows.find((r) => r.deptCode === selectedCode)
    if (!selected) return
    setForm({ ...selected })
    setIsEdit(false)
  }

  const onEdit = () => {
    const selected = rows.find((r) => r.deptCode === selectedCode)
    if (!selected) return
    setForm({ ...selected })
    setIsEdit(true)
  }

  const onCancel = () => setIsEdit(false)

  const onSave = (e) => {
    e.preventDefault()
    setIsEdit(false)
  }

  // Upload handling
  const onUploadClick = () => fileRef.current?.click()
  const onFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
  }

  const onDownloadTemplate = () => {
    window.open('/templates/ARP_T01_Dept_Data_Template.xlsx', '_blank')
  }

  return (
    <CRow>
      <CCol xs={12}>
        {/* TOP HEADER: Department Setup + Add/Upload/Download */}
        <CCard className="mb-3">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>DEPARTMENT SETUP</strong>

            <div className="d-flex gap-2">
              <ArpButton label="Add New" icon="add" color="purple" onClick={onAddNew} />

              <input
                ref={fileRef}
                type="file"
                style={{ display: 'none' }}
                onChange={onFileChange}
              />

              <ArpButton label="Upload" icon="upload" color="info" onClick={onUploadClick} />
              <ArpButton
                label="Download Template"
                icon="download"
                color="danger"
                onClick={onDownloadTemplate}
              />
            </div>
          </CCardHeader>
        </CCard>

        {/* ✅ Department Configuration (FORM) */}
        <CCard className="mb-3">
          <CCardHeader>
            <strong>Department Configuration</strong>
          </CCardHeader>

          <CCardBody>
            <CForm onSubmit={onSave}>
              <CRow className="g-3">
                {/* Row 1 */}
                <CCol md={3}>
                  <CFormLabel>Department Code</CFormLabel>
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    value={form.deptCode}
                    onChange={onChange('deptCode')}
                    disabled={!isEdit}
                  />
                </CCol>

                <CCol md={3}>
                  <CFormLabel>Department Name</CFormLabel>
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    value={form.deptName}
                    onChange={onChange('deptName')}
                    disabled={!isEdit}
                  />
                </CCol>

                {/* Row 2 */}
                <CCol md={3}>
                  <CFormLabel>Year of Establishment</CFormLabel>
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={form.estYear}
                    onChange={onChange('estYear')}
                    disabled={!isEdit}
                  >
                    <option value="">Select</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>

                <CCol md={3}>
                  <CFormLabel>Whether Accredited by NBA</CFormLabel>
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={form.nbaAccredited}
                    onChange={onChange('nbaAccredited')}
                    disabled={!isEdit}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </CFormSelect>
                </CCol>

                {/* Row 3 */}
                <CCol md={3}>
                  <CFormLabel>Objectives</CFormLabel>
                </CCol>
                <CCol md={3}>
                  <CFormTextarea
                    value={form.objectives}
                    onChange={onChange('objectives')}
                    rows={5}
                    disabled={!isEdit}
                  />
                </CCol>

                <CCol md={3}>
                  <CFormLabel>Vision</CFormLabel>
                </CCol>
                <CCol md={3}>
                  <CFormTextarea
                    value={form.vision}
                    onChange={onChange('vision')}
                    rows={5}
                    disabled={!isEdit}
                  />
                </CCol>

                {/* Row 4 */}
                <CCol md={3}>
                  <CFormLabel>Mission</CFormLabel>
                </CCol>
                <CCol md={3}>
                  <CFormTextarea
                    value={form.mission}
                    onChange={onChange('mission')}
                    rows={5}
                    disabled={!isEdit}
                  />
                </CCol>

                <CCol md={3}>
                  <CFormLabel>Goal</CFormLabel>
                </CCol>
                <CCol md={3}>
                  <CFormTextarea
                    value={form.goal}
                    onChange={onChange('goal')}
                    rows={5}
                    disabled={!isEdit}
                  />
                </CCol>

                {/* Form actions */}
                <CCol xs={12} className="d-flex justify-content-end gap-2">
                  <ArpButton
                    label="Save"
                    icon="save"
                    color="success"
                    type="submit"
                    disabled={!isEdit}
                  />
                  <ArpButton
                    label="Cancel"
                    icon="cancel"
                    color="secondary"
                    type="button"
                    onClick={onCancel}
                  />
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>

        {/* Department Details */}
        <CCard className="mb-3">
          {/* Header line: title + actions right */}
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Department Details</strong>

            <div className="d-flex gap-2 align-items-center flex-nowrap">
              <ArpIconButton
                icon="view"
                color="purple"
                title="View"
                onClick={onView}
                disabled={!selectedCode}
              />
              <ArpIconButton
                icon="edit"
                color="info"
                title="Edit"
                onClick={onEdit}
                disabled={!selectedCode}
              />
              <ArpIconButton icon="delete" color="danger" title="Delete" disabled={!selectedCode} />
            </div>
          </CCardHeader>

          <CCardBody>
            {/* ✅ Search + Page Size (SAME LINE, NO WRAP) */}
            <div className="d-flex align-items-center gap-2 flex-nowrap mb-2">
              <CInputGroup style={{ width: 320 }}>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                />
              </CInputGroup>

              <CFormSelect
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                style={{ width: 120 }}
                title="Rows per page"
              >
                {[5, 10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n} / page
                  </option>
                ))}
              </CFormSelect>
            </div>

            <CTable bordered striped hover responsive className="mb-2">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{ width: 60 }}>Select</CTableHeaderCell>

                  <CTableHeaderCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => sortToggle('deptCode')}
                  >
                    Department Code{sortIndicator('deptCode')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => sortToggle('deptName')}
                  >
                    Department Name{sortIndicator('deptName')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => sortToggle('estYear')}
                  >
                    Year of Establishments{sortIndicator('estYear')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => sortToggle('nbaAccredited')}
                  >
                    NBA Accreditation{sortIndicator('nbaAccredited')}
                  </CTableHeaderCell>

                  <CTableHeaderCell>Objectives</CTableHeaderCell>
                  <CTableHeaderCell>Vision</CTableHeaderCell>
                  <CTableHeaderCell>Mission</CTableHeaderCell>
                  <CTableHeaderCell>Goal</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {loading ? (
                  <CTableRow>
                    <CTableDataCell colSpan={9} className="text-center py-4">
                      <CSpinner size="sm" className="me-2" />
                      Loading...
                    </CTableDataCell>
                  </CTableRow>
                ) : pageRows.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={9} className="text-center py-4">
                      No records found.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  pageRows.map((r) => (
                    <CTableRow key={r.deptCode}>
                      <CTableDataCell className="text-center">
                        <input
                          type="radio"
                          name="deptRow"
                          checked={selectedCode === r.deptCode}
                          onChange={() => setSelectedCode(r.deptCode)}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{r.deptCode}</CTableDataCell>
                      <CTableDataCell>{r.deptName}</CTableDataCell>
                      <CTableDataCell className="text-center">{r.estYear}</CTableDataCell>
                      <CTableDataCell className="text-center">{r.nbaAccredited}</CTableDataCell>
                      <CTableDataCell>{r.objectives}</CTableDataCell>
                      <CTableDataCell>{r.vision}</CTableDataCell>
                      <CTableDataCell>{r.mission}</CTableDataCell>
                      <CTableDataCell>{r.goal}</CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>

            {/* Bottom: Pagination only */}
            <div className="d-flex justify-content-end">
              <CPagination align="end" className="mb-0">
                <CPaginationItem
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </CPaginationItem>

                {Array.from({ length: totalPages })
                  .slice(Math.max(0, safePage - 3), Math.min(totalPages, safePage + 2))
                  .map((_, i) => {
                    const pageNumber = Math.max(1, safePage - 2) + i
                    if (pageNumber > totalPages) return null
                    return (
                      <CPaginationItem
                        key={pageNumber}
                        active={pageNumber === safePage}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </CPaginationItem>
                    )
                  })}

                <CPaginationItem
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </CPaginationItem>
              </CPagination>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Department
