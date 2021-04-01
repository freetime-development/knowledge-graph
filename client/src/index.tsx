import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Routes } from './conf'
import App from './pages/App/App'
import Note from './pages/Note/Note'


window.onerror = (message, source, lineno, colno, error) => {
  console.log("Boom-sync", message, source, lineno, colno, error)
}

window.onunhandledrejection = (event) => {
  console.log("Boom-async", event)
}

window.addEventListener('error', (event) => {
  console.log(event)
})

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path={Routes.ROOT} exact component={App} />
      <Route path={Routes.NOTE} exact component={Note} />
      <Redirect to={Routes.ROOT} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
)
