import { hot } from 'react-hot-loader/root'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Backdrop, Button, CircularProgress } from '@material-ui/core'

import { useController } from '../../store'
import Node from '../../components/Node/Node'
import { States } from '../../stores/nodeStore'

import './app.css'


const App: FunctionComponent<{}> = observer(() => {
  const { nodeController } = useController()
  const [{ cancel }, setCancel] = useState({ cancel: () => {} })

  useEffect(() => {
    const cancel = nodeController.getNodesByTopic('blender')
    setCancel({ cancel })
  }, [])

  if (nodeController.store.state === States.LOADING) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    )
  }

  return (
    <div className="nodes">
      <Button onClick={() => cancel()}>Cancel</Button>
      {nodeController.store.nodes.map((node, i) =>
        <Node
          tabIndex={i + 1}
          key={node.uid}
          data={node}
        />
      )}
    </div>
  )
})

const component = process.env.NODE_ENV === 'development' ? hot(App) : App

export default component
