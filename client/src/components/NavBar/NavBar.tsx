import React, { FunctionComponent } from "react"
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import { AccountCircle } from "@material-ui/icons"

import styles from './navbar.styles'
import { Link } from "react-router-dom"
import { Routes } from "../../conf"

const NavBar: FunctionComponent<{}> = ({}) => {
  const classes = styles()
  const isLoggedIn = true
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to={Routes.ROOT} className={classes.menuButton}>
            <Typography variant="h6" className={classes.title}>
              Nodes
            </Typography>
          </Link>
          <Link to={Routes.NOTE} className={classes.menuButton}>
            <Typography variant="h6" className={classes.title}>
              Notes
            </Typography>
          </Link>
          {isLoggedIn && (
            <div className={classes.right}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
  )
}

export default NavBar
