import React, { FunctionComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'

import styles from './sidebar.styles'
import { Container } from '@material-ui/core'

interface Props {
  width?: number
  open: boolean
  setOpen(open: boolean): void
  children: JSX.Element[] | JSX.Element
  anchor?: 'left' | 'right' | 'top' | 'bottom'
}

const Sidebar: FunctionComponent<Props> = ({ open, setOpen, children, width, anchor = 'left'}) => {
  const classes = styles({ width })

  function getPaperProps () {
    if (getOrientation() === 'vertical') {
      return {
        style: { top: '76px' }
      }
    }

    return {}
  }

  function getOrientation() {
    if (anchor === 'left' || anchor === 'right') {
      return 'vertical'
    } else {
      return 'horizontal'
    }
  }

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={setOpen}
      variant="persistent"
      PaperProps={getPaperProps()}
    >
      <div className={getOrientation() === 'vertical' ? classes.list : null} role="presentation">
        <Container maxWidth="lg" className="page">
          {children}
        </Container>
      </div>
    </Drawer>
  )
}

export default Sidebar
