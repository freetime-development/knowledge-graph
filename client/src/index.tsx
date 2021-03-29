import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Routes } from './conf'
import App from './pages/App/App'
import Note from './pages/Note/Note'

import nodeReducer from './features/nodes/nodeReducer'
import NotesReducer from './features/notes/noteReducer'
import UIReducer from './features/sidebar/sidebar'


const reducers = combineReducers({
  node: nodeReducer,
  ui: UIReducer,
  note: NotesReducer
})

const store = createStore(
  reducers,
  process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunkMiddleware)) : undefined
)

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
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={Routes.ROOT} exact component={App} />
        <Route path={Routes.NOTE} exact component={Note} />
        <Redirect to={Routes.ROOT} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
