import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Routes } from './conf'
import Sidebar from './components/Sidebar/Sidebar'
import App from './pages/App/App'
import Note from './pages/Note/Note'

import nodeReducer from './reducers/nodeReducer'
import UIReducer from './reducers/UIReducer'


const reducers = combineReducers({
  node: nodeReducer,
  ui: UIReducer
})

const store = createStore(
  reducers,
  process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunkMiddleware)) : undefined
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Sidebar />
      <Switch>
        <Route path={Routes.ROOT} exact component={App} />
        <Route path={Routes.NOTE} exact component={Note} />
        <Redirect to={Routes.ROOT} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
