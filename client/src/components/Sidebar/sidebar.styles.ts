import { makeStyles, Theme } from '@material-ui/core/styles'

const defaultDrawerWidth = 350

interface Props {
  width?: number
}

export default makeStyles<Theme, Props>((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  list: props => ({
    width: props.width || defaultDrawerWidth
  }),
  btn: {
    color: 'white'
  },
  content: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0,
    width: '100%'
  },
  contentShift: props => ({
    width: `calc(100% - ${props.width || defaultDrawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: props.width || defaultDrawerWidth
  })
}))
