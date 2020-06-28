import React, { FunctionComponent } from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typography, Container } from '@material-ui/core'

import { toggleSidebarVisibility } from '../../actions/UIActions'
import { RootState } from '../../interface'

import './note.css'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps

const Note: FunctionComponent<Props> = ({ isSidebarVisible, toggleSidebarVisibility }) => {

  function onKeyDown (e: React.KeyboardEvent<HTMLDivElement>) {
    const backslash = 191
    if (e.which === backslash) {
      toggleSidebarVisibility()
    }
    if (isSidebarVisible && e.which !== backslash) {
      toggleSidebarVisibility()
    }
  }

  return (
    <Container>
      <Typography variant="h5">
        New Note
      </Typography>
      <div className="note-element">
        <div contentEditable className="editor" tabIndex={0} onKeyDown={onKeyDown} />
      </div>
    </Container>
  )
}

const mapStateToProps = (
  state: RootState
) => ({
  isSidebarVisible: state.ui.isSidebarVisible
})

const mapDispatchToProps = {
  toggleSidebarVisibility
}

const component = process.env.NODE_ENV === 'development' ? hot(Note) : Note
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(component)
)

