import { hot } from 'react-hot-loader/root'
import React, { PureComponent, useEffect } from 'react'
import { withRouter, RouteComponentProps, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { RootState } from '../reducers/rootReducer'
import { rootAction } from '../actions/rootActions'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps

class App extends PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.props.rootAction("something")
  }

  render() {
    return (
      <Route path='/' exact={true}>
        <>
          {this.props.root}
        </>
      </Route>
    )
  }
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
