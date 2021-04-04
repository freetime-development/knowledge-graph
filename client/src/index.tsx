import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles'

import { Routes } from './conf'
import NavBar from './components/NavBar/NavBar'
import App from './pages/App/App'
import Note from './pages/Note/Note'

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react'
Amplify.configure(awsExports);

window.onerror = (message, source, lineno, colno, error) => {
  console.log("Boom-sync", message, source, lineno, colno, error)
}

window.onunhandledrejection = (event) => {
  console.log("Boom-async", event)
}

window.addEventListener('error', (event) => {
  console.log(event)
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f5f5f5'
    }
  },
  overrides: {
  }
})

const RootComponent = withAuthenticator(() => {
  return (
    <BrowserRouter>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <Route path={Routes.ROOT} exact component={App} />
          <Route path={Routes.NOTE} exact component={Note} />
          <Redirect to={Routes.ROOT} />
      </Switch>
      </ThemeProvider>
    </StylesProvider>
  </BrowserRouter>
  )
})

ReactDOM.render(
  <RootComponent />,
  document.getElementById('app')
)
