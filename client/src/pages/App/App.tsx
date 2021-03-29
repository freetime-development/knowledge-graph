import { hot } from 'react-hot-loader/root'
import React, { FunctionComponent, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadNodesByTopic } from '../../features/nodes/nodeReducer'
import Node from '../../components/Node/Node'

import './app.css'
import { RootState } from '../../interface'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps

const App: FunctionComponent<Props> = ({ loadNodesByTopic, nodes }) => {
  console.log(nodes)
  useEffect(() => {
    loadNodesByTopic("blender")
  }, [])

  return (
    <div className="nodes">
      {nodes.map((node, i) =>
        <Node
          tabIndex={i + 1}
          key={node.uid}
          data={node}
          addNote={null}
          onSave={() => {}}
          onDiscard={() => {}}
          onAnnotate={() => {}}
          onTopic={() => {}}
        />
      )}
    </div>
  )
}

const mapStateToProps = (
  state: RootState
) => ({
  nodes: state.node.nodes
})

const mapDispatchToProps = {
  loadNodesByTopic
}

const component = process.env.NODE_ENV === 'development' ? hot(App) : App
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(component)
)
