import { hot } from 'react-hot-loader/root'
import React, { PureComponent } from 'react'
import { withRouter, RouteComponentProps, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { RootState } from '../reducers/nodeReducer'
import { loadNodesByTopic } from '../actions/nodeActions'
import Node from './Node/Node'
import { list } from '../utils'
import './app.css'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps

class App extends PureComponent<Props> {
  constructor (props: Props) {
    super(props)
  }

  componentDidMount () {
    this.props.loadNodesByTopic('blender')
  }

  render () {
    return (
      <Route path='/' exact={true}>
        <>
          <div className="nodes">
            {list(this.props.nodes, (node) =>
              <Node
                key={node.uid}
                data={node}
                onSave={() => {}}
                onDiscard={() => {}}
                onAnnotate={() => {}}
                onTopic={() => {}}
              />
            )}
          </div>
        </>
      </Route>
    )
  }
}

const mapStateToProps = (
  state: RootState
) => ({
  nodes: state.nodes
})

const mapDispatchToProps = {
  loadNodesByTopic
}

const component = process.env.NODE_ENV === 'development' ? hot(App) : App
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(component)
)
