import { hot } from 'react-hot-loader/root'
import React, { FunctionComponent, useEffect } from 'react'
import { withRouter, RouteComponentProps, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { RootState } from '../reducers/nodeReducer'
import { loadNodesByTopic } from '../actions/nodeActions'
import Node from './Node/Node'
import { list } from '../utils'
import Note from '../pages/Note/Note'

import './app.css'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps

const App: FunctionComponent<Props> = ({ loadNodesByTopic, nodes }) => {
  useEffect(() => {
    loadNodesByTopic("blender")
  }, [])

  return (
    <Switch>
      <Route path='/' exact={true}>
        <>
          <div className="nodes">
            {list(nodes, (node) =>
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
      <Route path='/test' exact component={Note} />
    </Switch>
  )
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
