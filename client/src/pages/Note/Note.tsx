import React, { FunctionComponent, useState } from 'react'

import Container from '@material-ui/core/Container'

import './note.css'
import { Typography } from '@material-ui/core'

const actions = [
  'action1',
  'action2'
]

const Note: FunctionComponent<{}> = () => {
  const [actionModalVisible, setActionModalVisibility] = useState(false)
  const handler = (e) => {
    const backslash = 191
    if (e.which === backslash) {
      setActionModalVisibility(true)
    }
    if (actionModalVisible && e.which !== backslash) {
      setActionModalVisibility(false)
    }
  }
  return (
    <Container>
    <Typography variant="h5">
      New Note
    </Typography>
    <div className="note-element">
      <div contentEditable className="editor" tabIndex={0} onKeyDown={handler} />
      {actionModalVisible &&
        <div className="action-modal">
          {actions.map((a) => a)}
        </div>
      }
      </div>
    </Container>
  )
}

export default Note
