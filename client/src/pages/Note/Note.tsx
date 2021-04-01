import React, { FunctionComponent, useState, useRef } from 'react'
import * as THREE from 'three';
import { hot } from 'react-hot-loader/root'
import { Typography, Container } from '@material-ui/core'
import ForceGraph3D from 'react-force-graph-3d'
import { observer } from 'mobx-react-lite'

import Node from '../../components/Node/Node'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useController } from '../../store'

import './note.css'

enum Commands {
  NODES = '/n'
}

const Note: FunctionComponent<{}> = observer(({}) => {
  const { nodeController, noteController } = useController()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const editor = useRef<HTMLDivElement>()

  function onKeyDown (e: React.KeyboardEvent<HTMLDivElement>) {
    const innerText = e.currentTarget.innerText
    // const backslash = 191
    console.log(innerText)
    if (innerText.includes(Commands.NODES)) {
      const query = innerText.split(' ')
      nodeController.getNodesByTopic(query[1])
      setSidebarOpen(true)
    } else {
      setSidebarOpen(false)
    }
  }

  return (
    <Container>
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      >
        <div className="nodes">
          {nodeController.store.nodes.map((node, i) =>
            <Node
              tabIndex={i + 1}
              key={node.uid}
              data={node}
            />
          )}
        </div>
      </Sidebar>
      <Typography variant="h5">
        New Note
      </Typography>
      <div className="note-element">
        <div
          contentEditable
          tabIndex={0}
          ref={editor}
          className="editor"
          onKeyUp={onKeyDown}
        >
        {noteController.store.notes.map((node, i) =>
            <div key={node.uid}>
              <Node
                tabIndex={i + 1}
                data={node}
              />
              <br/>
            </div>
          )}
        </div>
      </div>
    <ForceGraph3D
        backgroundColor="#f5f5f5"
        graphData={{ nodes: nodeController.store.nodes, links: [] }}
        nodeLabel='title'
        nodeThreeObject={({ contentId }) => {
          const loader = new THREE.TextureLoader()
          const imgTexture = loader.load(`http://localhost:8010/proxy/vi/${contentId}/mqdefault.jpg`);
          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(12, 12);

          return sprite;
        }}
      />
    </Container>
  )
})

const component = process.env.NODE_ENV === 'development' ? hot(Note) : Note

export default component

