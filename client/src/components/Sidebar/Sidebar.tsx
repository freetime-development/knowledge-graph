import React, { FunctionComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'

import styles from './sidebar.styles'
import { Container } from '@material-ui/core'

interface Props {
  width?: number
  open: boolean
  setOpen(open: boolean): void
  children: JSX.Element[] | JSX.Element
}

const Sidebar: FunctionComponent<Props> = ({ open, setOpen, children, width }) => {
  const classes = styles({ width })

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={setOpen}
      variant="persistent"
      PaperProps={{ style: { top: '64px' } }}
    >
      <div className={classes.list} role="presentation">
        <Container maxWidth="lg" className="page">
          {children}
        </Container>
      </div>
    </Drawer>
  )
}

export default Sidebar
