import { hot } from 'react-hot-loader/root'
import React, { FunctionComponent, useEffect } from 'react'
import { withRouter, RouteComponentProps, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { RootState } from '../reducers/rootReducer'
import { rootAction } from '../actions/rootActions'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps

const App: FunctionComponent<Props> = ({ rootAction, root }) => {
  useEffect(() => {
    rootAction('something')
  }, [root])

  return (
    <Route path='/' exact={true}>
      {root}
    </Route>
  )
}

const mapStateToProps = (
  state: RootState
) => ({
  root: state.root
})

const mapDispatchToProps = {
  rootAction
}

const component = process.env.NODE_ENV === 'development' ? hot(App) : App
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(component)
)
