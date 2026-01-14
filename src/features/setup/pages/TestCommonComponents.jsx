import React from 'react'
import { CFormInput } from '@coreui/react'
import { cilPlus } from '@coreui/icons'

import CardShell from '../../../components/common/CardShell'
import FormRow from '../../../components/common/FormRow'
import IconCircleButton from '../../../components/common/IconCircleButton'

export default function TestCommonComponents() {
  return (
    <div className="p-4">
      <CardShell
        title="Common Components Import Test"
        subtitle="CardShell + FormRow + IconCircleButton"
        actions={
          <IconCircleButton
            icon={cilPlus}
            title="Add"
            className="btn-arp-add"
            onClick={() => alert('Icon button works')}
          />
        }
      >
        <FormRow
          leftLabel="Test Label"
          leftControl={<CFormInput placeholder="FormRow working" />}
          rightLabel="Another Label"
          rightControl={<CFormInput placeholder="Yes, it works" />}
        />
      </CardShell>
    </div>
  )
}
