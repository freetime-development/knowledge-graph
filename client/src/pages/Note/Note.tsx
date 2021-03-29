import React, { FunctionComponent, useState, useRef } from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typography, Container } from '@material-ui/core'
import ForceGraph3D from 'react-force-graph-3d'

import { loadNodesByTopic } from '../../features/nodes/nodeReducer'
import { addNodeToNotes } from '../../features/notes/noteReducer'
import { RootState, Node as INode } from '../../interface'
import Node from '../../components/Node/Node'


import './note.css'
import Sidebar from '../../components/Sidebar/Sidebar'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps

enum Commands {
  NODES = '/n'
}

const Note: FunctionComponent<Props> = ({ loadNodesByTopic, nodes, addNodeToNotes, notes }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const editor = useRef<HTMLDivElement>()

  function onKeyDown (e: React.KeyboardEvent<HTMLDivElement>) {
    const innerText = e.currentTarget.innerText
    // const backslash = 191
    console.log(innerText)
    if (innerText.includes(Commands.NODES)) {
      const query = innerText.split(' ')
      loadNodesByTopic(query[1])
      setSidebarOpen(true)
    } else {
      setSidebarOpen(false)
    }
  }

  function addNote (node: INode) {
    addNodeToNotes(node)
    editor.current.innerText = ''
    editor.current.focus()
  }

  return (
    <>
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      >
        <div className="nodes">
          {nodes.map((node, i) =>
            <Node
              tabIndex={i + 1}
              key={node.uid}
              data={node}
              addNote={addNote}
              onSave={() => {}}
              onDiscard={() => {}}
              onAnnotate={() => {}}
              onTopic={() => {}}
            />
          )}
        </div>
      </Sidebar>
    <Container>
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
        {notes.map((node, i) =>
            <div key={node.uid}>
              <Node
                tabIndex={i + 1}
                data={node}
                addNote={addNote}
                onSave={() => {}}
                onDiscard={() => {}}
                onAnnotate={() => {}}
                onTopic={() => {}}
              />
              <br/>
            </div>
          )}
        </div>
      </div>
    </Container>
    <ForceGraph3D
        backgroundColor="#f5f5f5"
        graphData={{ nodes: nodes, links: [] }}
        nodeLabel='title'
        nodeThreeObject={({ contentId }) => {
          const loader = new THREE.TextureLoader()
          loader.setRequestHeader({
            'sec-fetch-mode': 'no-cors'
          })
          const imgTexture = loader.load(`http://cors-anywhere.herokuapp.com/https://img.youtube.com/vi/${contentId}/mqdefault.jpg`);
          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(24, 24);

          return sprite;
        }}
      />
    </>
  )
}

const mapStateToProps = (
  state: RootState
) => ({
  nodes: state.node.nodes,
  notes: state.note.notes
})

const mapDispatchToProps = {
  loadNodesByTopic,
  addNodeToNotes
}

const component = process.env.NODE_ENV === 'development' ? hot(Note) : Note
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(component)
)

