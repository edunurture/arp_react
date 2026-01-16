import React, { useMemo, useState, useEffect } from 'react'
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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormCheck,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import { ArpButton, ArpIconButton } from '../../components/common'

/**
 * EXACT UI INTENT (from HEISA Teaching–Learning PDF):
 * Page 18: "COURSES TO BE COMPLETED FOR" filter + "DETAILS FOR COURSE COMPLETION" table (Action: +, eye)
 * Page 19: "LECTURE TO BE SCHEDULED FOR" filter + schedule grid with completion date dropdown + Save/Reset/Cancel
 */

const CourseCompletion = () => {
  // viewMode: 'list' = Page 18, 'detail' = Page 19
  const [viewMode, setViewMode] = useState('list')

  // Header selection (used for table row radio)
  const [selectedId, setSelectedId] = useState(null)

  // ---------- Page 18: COURSES TO BE COMPLETED FOR (filters) ----------
  const [filters, setFilters] = useState({
    academicYear: '',
    programmeCode: '',
    programme: '',
    semester: '',
  })

  const onFilterChange = (key) => (e) =>
    setFilters((p) => ({ ...p, [key]: e.target.value }))

  const onSearchCourses = (e) => {
    e?.preventDefault?.()
    // Later: API fetch based on filters
  }

  const onResetCourses = () => {
    setFilters({ academicYear: '', programmeCode: '', programme: '', semester: '' })
    setSelectedId(null)
  }

  const onCancelCourses = () => {
    // Return to initial state
    onResetCourses()
  }

  // ---------- Page 18: DETAILS FOR COURSE COMPLETION (table) ----------
  const [courseRows] = useState([
    {
      id: 1,
      courseCode: '23-2AA-11T',
      courseName: 'LANGUAGE – 1',
      facultyId: '23KCAS01',
      facultyName: 'PRIYA.P',
      status: 'COURSE COMPLETION PENDING',
    },
    {
      id: 2,
      courseCode: '23-2AA-12E',
      courseName: 'ENGLISH – I',
      facultyId: '23KCAS02',
      facultyName: 'PRABHAKARAN .R',
      status: 'COURSE COMPLETED',
    },
    {
      id: 3,
      courseCode: '23-2AA-13A',
      courseName: 'Core I – PRINCIPLES OF ACCOUNTANCY',
      facultyId: '23KCAS03',
      facultyName: 'SAMBATH KUMAR S',
      status: 'COURSE COMPLETED',
    },
    {
      id: 4,
      courseCode: '23-2AA-13C',
      courseName: 'CORE II – BUSINESS ORGANIZATION AND OFFICE MANAGEMENT',
      facultyId: '23KCAS04',
      facultyName: 'SRUTHI T',
      status: 'COURSE COMPLETION PENDING',
    },
    {
      id: 5,
      courseCode: '23-2AA-1AA',
      courseName: 'AGRICULTURAL ECONOMY OF INDIA',
      facultyId: '23KCAS05',
      facultyName: 'SUMITHRA DEVI .N',
      status: 'COURSE COMPLETION PENDING',
    },
  ])

  // Table UX (Institution.js style)
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  const normalize = (v) =>
    String(v ?? '')
      .toLowerCase()
      .trim()

  const filteredCourses = useMemo(() => {
    const q = normalize(search)
    if (!q) return courseRows
    return courseRows.filter((r) =>
      [
        r.courseCode,
        r.courseName,
        r.facultyId,
        r.facultyName,
        r.status,
      ]
        .map(normalize)
        .join(' ')
        .includes(q),
    )
  }, [courseRows, search])

  useEffect(() => {
    setPage(1)
  }, [search, pageSize])

  const total = filteredCourses.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const startIdx = total === 0 ? 0 : (safePage - 1) * pageSize
  const endIdx = Math.min(startIdx + pageSize, total)
  const pageCourses = useMemo(
    () => filteredCourses.slice(startIdx, endIdx),
    [filteredCourses, startIdx, endIdx],
  )

  useEffect(() => {
    if (page !== safePage) setPage(safePage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  const selectedCourse = useMemo(
    () => courseRows.find((x) => x.id === selectedId) || null,
    [courseRows, selectedId],
  )

  // Page 18 action icons: "+" and "eye" → open detail (Page 19)
  const openDetail = (editable) => {
    if (!selectedCourse) return
    setDetailHeader((p) => ({
      ...p,
      isEdit: editable,
    }))
    setViewMode('detail')
  }

  // ---------- Page 19: LECTURE TO BE SCHEDULED FOR (header filters) ----------
  const [detailHeader, setDetailHeader] = useState({
    isCombinedCourse: '',
    schedule: '',
    className: '',
    section: '',
    isEdit: false,
  })

  const onDetailHeaderChange = (key) => (e) =>
    setDetailHeader((p) => ({ ...p, [key]: e.target.value }))

  const onDetailSearch = (e) => {
    e?.preventDefault?.()
    // Later: fetch schedule grid for selected course + header filters
  }

  const onDetailReset = () => {
    setDetailHeader({
      isCombinedCourse: '',
      schedule: '',
      className: '',
      section: '',
      isEdit: detailHeader.isEdit, // keep mode
    })
  }

  const onDetailCancel = () => {
    setViewMode('list')
    setDetailHeader({
      isCombinedCourse: '',
      schedule: '',
      className: '',
      section: '',
      isEdit: false,
    })
  }

  // ---------- Page 19: schedule grid ----------
  const [scheduleRows, setScheduleRows] = useState([
    { id: 1, date: '01/12/2023', dayOrder: 'I', hour: '1', chapter: 'UNIT – 1', topic: 'INTRODUCTION OF PRINCIPLES OF ACCOUNTANCY', completionDate: '' },
    { id: 2, date: '01/12/2023', dayOrder: 'I', hour: '3', chapter: 'UNIT – 1', topic: 'THE CLASSIFIED BALANCE SHEET', completionDate: '' },
    { id: 3, date: '02/12/2023', dayOrder: 'II', hour: '1', chapter: 'UNIT – 1', topic: 'BOOKS OF ORIGINAL ENTRY', completionDate: '' },
    { id: 4, date: '04/12/2023', dayOrder: 'III', hour: '2', chapter: 'UNIT – 1', topic: 'LEDGERS AND THE TRIAL BALANCE', completionDate: '' },
    { id: 5, date: '06/12/2023', dayOrder: 'VI', hour: '4', chapter: 'UNIT – 1', topic: 'PERIOD ADJUSTMENT', completionDate: '' },
  ])

  const chapterOptions = useMemo(() => ['UNIT – 1', 'UNIT – 2', 'UNIT – 3', 'UNIT – 4', 'UNIT – 5'], [])
  const completionDateOptions = useMemo(() => ['01/12/2023', '02/12/2023', '04/12/2023', '06/12/2023'], [])

  const onScheduleChange = (rowId, key) => (e) => {
    const val = e.target.value
    setScheduleRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [key]: val } : r)),
    )
  }

  const onSaveSchedule = () => {
    // Later: API save
    setDetailHeader((p) => ({ ...p, isEdit: false }))
  }

  // ---------- Dropdown data placeholders ----------
  const academicYears = useMemo(() => ['2023 - 24', '2024 - 25', '2025 - 26'], [])
  const programmes = useMemo(() => ['B.Com', 'BBA', 'BA English'], [])
  const programmeCodes = useMemo(() => ['23-2AA', '24-2BB', '25-2CC'], [])
  const semesters = useMemo(() => ['Sem - 1', 'Sem - 3', 'Sem - 5'], [])
  const yesNo = useMemo(() => ['Yes', 'No'], [])
  const schedules = useMemo(() => ['Combined Schedule A', 'Combined Schedule B'], [])
  const classes = useMemo(() => ['I BCom', 'I BBA'], [])
  const sections = useMemo(() => ['A', 'B'], [])

  // ================= RENDER =================
  return (
    <CRow>
      <CCol xs={12}>
        {/* ================= 1️⃣ HEADER ACTION CARD ================= */}
        <CCard className="mb-3">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>COURSE COMPLETION</strong>

            <div className="d-flex gap-2">
              {viewMode === 'list' ? (
                <>
                  <ArpButton
                    label="Add New"
                    icon="add"
                    color="purple"
                    disabled={!selectedId}
                    onClick={() => openDetail(true)} // "+" behavior
                    title="Open Course Completion Grid"
                  />
                  <ArpButton
                    label="View"
                    icon="view"
                    color="primary"
                    disabled={!selectedId}
                    onClick={() => openDetail(false)} // "eye" behavior
                    title="View Completion Details"
                  />
                </>
              ) : (
                <>
                  <ArpButton
                    label="Back"
                    icon="cancel"
                    color="secondary"
                    onClick={onDetailCancel}
                    title="Back to Course List"
                  />
                </>
              )}
            </div>
          </CCardHeader>
        </CCard>

        {/* ================= 2️⃣ FORM CARD ================= */}
        {viewMode === 'list' ? (
          <CCard className="mb-3">
            <CCardHeader>
              <strong>COURSES TO BE COMPLETED FOR</strong>
            </CCardHeader>

            <CCardBody>
              <CForm onSubmit={onSearchCourses}>
                <CRow className="g-3">
                  <CCol md={3}>
                    <CFormLabel>Academic Year *</CFormLabel>
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect value={filters.academicYear} onChange={onFilterChange('academicYear')}>
                      <option value="">Select</option>
                      {academicYears.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel>Choose Programme *</CFormLabel>
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect value={filters.programme} onChange={onFilterChange('programme')}>
                      <option value="">Select</option>
                      {programmes.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel>Programme Code *</CFormLabel>
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect value={filters.programmeCode} onChange={onFilterChange('programmeCode')}>
                      <option value="">Select</option>
                      {programmeCodes.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel>Choose Semester *</CFormLabel>
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect value={filters.semester} onChange={onFilterChange('semester')}>
                      <option value="">Select</option>
                      {semesters.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  {/* Search / Reset / Cancel (right-aligned like screenshot) */}
                  <CCol xs={12} className="d-flex justify-content-end gap-2 mt-2">
                    <ArpButton label="Search" icon="search" color="warning" type="submit" />
                    <ArpButton label="Reset" icon="reset" color="secondary" type="button" onClick={onResetCourses} />
                    <ArpButton label="Cancel" icon="cancel" color="secondary" type="button" onClick={onCancelCourses} />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        ) : (
          <CCard className="mb-3">
            <CCardHeader>
              <strong>LECTURE TO BE SCHEDULED FOR</strong>
            </CCardHeader>

            <CCardBody>
              <CForm onSubmit={onDetailSearch}>
                <CRow className="g-3">
                  <CCol md={3}>
                    <CFormLabel>Is Combined Course? *</CFormLabel>
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect
                      value={detailHeader.isCombinedCourse}
                      onChange={onDetailHeaderChange('isCombinedCourse')}
                      disabled={!detailHeader.isEdit}
                    >
                      <option value="">Select</option>
                      {yesNo.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel>If Yes Choose Schedule *</CFormLabel>
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect
                      value={detailHeader.schedule}
                      onChange={onDetailHeaderChange('schedule')}
                      disabled={!detailHeader.isEdit}
                    >
                      <option value="">Select</option>
                      {schedules.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel>Choose Class *</CFormLabel>
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect
                      value={detailHeader.className}
                      onChange={onDetailHeaderChange('className')}
                      disabled={!detailHeader.isEdit}
                    >
                      <option value="">Select</option>
                      {classes.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel>Choose Section *</CFormLabel>
                  </CCol>
                  <CCol md={3}>
                    <CFormSelect
                      value={detailHeader.section}
                      onChange={onDetailHeaderChange('section')}
                      disabled={!detailHeader.isEdit}
                    >
                      <option value="">Select</option>
                      {sections.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  {/* Search / Reset / Cancel (right-aligned like screenshot) */}
                  <CCol xs={12} className="d-flex justify-content-end gap-2 mt-2">
                    <ArpButton label="Search" icon="search" color="warning" type="submit" disabled={!detailHeader.isEdit} />
                    <ArpButton label="Reset" icon="reset" color="secondary" type="button" onClick={onDetailReset} />
                    <ArpButton label="Cancel" icon="cancel" color="secondary" type="button" onClick={onDetailCancel} />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        )}

        {/* ================= 3️⃣ TABLE CARD ================= */}
        {viewMode === 'list' ? (
          <CCard className="mb-3">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>DETAILS FOR COURSE COMPLETION</strong>

              <div className="d-flex align-items-center gap-2 flex-nowrap" style={{ overflowX: 'auto' }}>
                <CFormInput
                  size="sm"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <CFormSelect
                  size="sm"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  title="Rows per page"
                >
                  {[5, 10, 20, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </CFormSelect>

                {/* Page 18 action icons: + and eye */}
                <div className="d-flex gap-2 align-items-center flex-nowrap">
                  <ArpIconButton
                    icon="add"
                    color="purple"
                    title="New / Add Completion"
                    onClick={() => openDetail(true)}
                    disabled={!selectedId}
                  />
                  <ArpIconButton
                    icon="view"
                    color="primary"
                    title="View"
                    onClick={() => openDetail(false)}
                    disabled={!selectedId}
                  />
                </div>
              </div>
            </CCardHeader>

            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell style={{ width: 60 }}>Select</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 150 }}>Course Code</CTableHeaderCell>
                    <CTableHeaderCell>Course Name</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 140 }}>Faculty ID</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 180 }}>Faculty Name</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 240 }}>Status</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 130 }}>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {pageCourses.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan={7} className="text-center py-4">
                        No records found.
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    pageCourses.map((r) => (
                      <CTableRow key={r.id}>
                        <CTableDataCell className="text-center">
                          <CFormCheck
                            type="radio"
                            name="courseRow"
                            checked={selectedId === r.id}
                            onChange={() => setSelectedId(r.id)}
                          />
                        </CTableDataCell>
                        <CTableDataCell>{r.courseCode}</CTableDataCell>
                        <CTableDataCell>{r.courseName}</CTableDataCell>
                        <CTableDataCell className="text-center">{r.facultyId}</CTableDataCell>
                        <CTableDataCell>{r.facultyName}</CTableDataCell>
                        <CTableDataCell>{r.status}</CTableDataCell>
                        <CTableDataCell className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <ArpIconButton
                              icon="add"
                              color="purple"
                              title="New / Add Completion"
                              onClick={() => {
                                setSelectedId(r.id)
                                setTimeout(() => openDetail(true), 0)
                              }}
                            />
                            <ArpIconButton
                              icon="view"
                              color="primary"
                              title="View"
                              onClick={() => {
                                setSelectedId(r.id)
                                setTimeout(() => openDetail(false), 0)
                              }}
                            />
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2">
                <div className="small text-medium-emphasis">
                  {total === 0 ? 'Showing 0–0 of 0' : `Showing ${startIdx + 1}–${endIdx} of ${total}`}
                </div>

                <CPagination size="sm" className="mb-0">
                  <CPaginationItem disabled={safePage <= 1} onClick={() => setPage(1)}>
                    «
                  </CPaginationItem>
                  <CPaginationItem
                    disabled={safePage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    ‹
                  </CPaginationItem>
                  <CPaginationItem active>{safePage}</CPaginationItem>
                  <CPaginationItem
                    disabled={safePage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    ›
                  </CPaginationItem>
                  <CPaginationItem disabled={safePage >= totalPages} onClick={() => setPage(totalPages)}>
                    »
                  </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        ) : (
          <CCard className="mb-3">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>{selectedCourse ? selectedCourse.courseName : 'COURSE COMPLETION GRID'}</strong>

              {/* No table header icons on page 19; buttons are at bottom-right */}
              <div className="small text-medium-emphasis">
                {selectedCourse ? `${selectedCourse.courseCode} • ${selectedCourse.facultyName}` : ''}
              </div>
            </CCardHeader>

            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell style={{ width: 120 }}>DATE</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 120 }}>DAY ORER</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 100 }}>HOUR</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 220 }}>CHOOSE CHAPTER</CTableHeaderCell>
                    <CTableHeaderCell>LECTURE TOPIC</CTableHeaderCell>
                    <CTableHeaderCell style={{ width: 220 }}>COMPLETION DATE</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {scheduleRows.map((r) => (
                    <CTableRow key={r.id}>
                      <CTableDataCell>{r.date}</CTableDataCell>
                      <CTableDataCell className="text-center">{r.dayOrder}</CTableDataCell>
                      <CTableDataCell className="text-center">{r.hour}</CTableDataCell>
                      <CTableDataCell>
                        <CFormSelect
                          value={r.chapter}
                          onChange={onScheduleChange(r.id, 'chapter')}
                          disabled={!detailHeader.isEdit}
                        >
                          {chapterOptions.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </CFormSelect>
                      </CTableDataCell>
                      <CTableDataCell>{r.topic}</CTableDataCell>
                      <CTableDataCell>
                        <CFormSelect
                          value={r.completionDate}
                          onChange={onScheduleChange(r.id, 'completionDate')}
                          disabled={!detailHeader.isEdit}
                        >
                          <option value=""></option>
                          {completionDateOptions.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </CFormSelect>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              {/* Page 19 buttons: Save / Reset / Cancel (right aligned) */}
              <div className="d-flex justify-content-end gap-2 mt-3">
                <ArpButton label="Save" icon="save" color="secondary" type="button" onClick={onSaveSchedule} disabled={!detailHeader.isEdit} />
                <ArpButton label="Reset" icon="reset" color="secondary" type="button" onClick={onDetailReset} />
                <ArpButton label="Cancel" icon="cancel" color="secondary" type="button" onClick={onDetailCancel} />
              </div>
            </CCardBody>
          </CCard>
        )}
      </CCol>
    </CRow>
  )
}

export default CourseCompletion
