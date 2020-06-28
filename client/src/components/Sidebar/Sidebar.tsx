import React, { FunctionComponent } from 'react'
import { hot } from 'react-hot-loader/root'
import clsx from 'clsx'

import { Drawer } from '@material-ui/core'

import { useStyles } from './siderbar.styles'
import { connect } from 'react-redux'
import { RootState } from '../../interface'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const actions = [
  'action1',
  'action2'
]

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps


const Sidebar: FunctionComponent<Props> = ({ isSidebarVisible }) => {
  const classes = useStyles()

  return (
    <Drawer
      anchor="right"
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isSidebarVisible,
        [classes.drawerClose]: !isSidebarVisible,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isSidebarVisible,
          [classes.drawerClose]: !isSidebarVisible,
        }),
      }}
    >
      {actions.map((a) => a)}
    </Drawer>
  )
}

const mapStateToProps = (
  state: RootState
) => ({
  isSidebarVisible: state.ui.isSidebarVisible
})

const mapDispatchToProps = {

}

const component = process.env.NODE_ENV === 'development' ? hot(Sidebar) : Sidebar
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(component)
)

