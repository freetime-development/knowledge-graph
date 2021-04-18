import React, { FunctionComponent, useState, useRef, useEffect } from 'react'
import * as THREE from 'three';
import { hot } from 'react-hot-loader/root'
import { Button, Container, MenuItem, Select } from '@material-ui/core'
import ForceGraph3D from 'react-force-graph-3d'
import { observer } from 'mobx-react-lite'

import Node from '../../components/Node/Node'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useController } from '../../store'

import './note.css'
import { Link } from '../../interface';

enum Commands {
  NODES = '/n'
}

const emptyLink = {
  label: '',
  source: null,
  target: null,
  direction: 0,
  rotation: 0
}

const Note: FunctionComponent<{}> = observer(({}) => {
  const { nodeController, noteController } = useController()
  const [commandLineSidebar, setCommandLineSidebar] = useState(false)
  const [graphSidebar, setGraphSidebar] = useState(false)
  const [newLink, setNewLink] = useState<Link>({ ...emptyLink })
  const [graph, setGraph] = useState({ graph: null })
  const instance = useRef<any>()
  const wrapper = useRef<HTMLDivElement>()
  const editor = useRef<HTMLDivElement>()

  function onKeyDown (e: React.KeyboardEvent<HTMLDivElement>) {
    const innerText = e.currentTarget.innerText
    // const backslash = 191
    console.log(innerText)
    if (innerText.includes(Commands.NODES)) {
      const query = innerText.split(' ')
      nodeController.getNodesByTopic(query[1])
      if (!commandLineSidebar) {
        setCommandLineSidebar(true)
      }
    } else {
      if (commandLineSidebar) {
        setCommandLineSidebar(false)
      }
    }
  }

  function handleNodeClick(node, event) {
    instance.current.d3Force('charge').strength(0)
    if (!newLink.source) {
      setNewLink({ ...newLink, source: node })
      setGraphSidebar(true)
    } else {
      if (newLink.source.uid !== node.uid) {
        const link = {
          ...newLink,
          target: node,
          rotation: Math.PI * nodeController.store.links.length / 6
        }
        setNewLink(link)
        setTimeout(() => {
          instance.current.d3Force('charge').strength(-30)
        }, 2000)
      }
    }
  }

  function createNewLink () {
    nodeController.addLink(newLink)
    setNewLink(emptyLink)
    setGraphSidebar(false)
  }

  function cancelNewLinkCreation () {
    setNewLink(emptyLink)
    setGraphSidebar(false)
  }

  useEffect(() => {
    if (instance) {
      instance.current.d3Force('link').strength(0)
    }
    if (!nodeController.store.nodes.length) {
      nodeController.getNodesByTopic('blender')
    }
  }, [])

  return (
    <Container>
      <Sidebar
        open={commandLineSidebar}
        setOpen={setCommandLineSidebar}
        anchor='right'
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
      <Sidebar
        open={graphSidebar}
        setOpen={setGraphSidebar}
        anchor='bottom'
      >
        <div className="link-creation">
          {newLink.source &&
            <div className="node-round">
              <div title={newLink.source.title}>
                <img src={`https://img.youtube.com/vi/${newLink.source.contentId}/default.jpg`} />
              </div>
            </div>
          }
          <div className="horizontal-line">
            <p>Direction</p>
            <span></span>
          </div>
          <div className="link-direction">
            <Select
              onChange={(e) => setNewLink({ ...newLink, direction: e.target.value as any })}
            >
              <MenuItem value={0}>Non-directional</MenuItem>
              <MenuItem value={-1}>Left</MenuItem>
              <MenuItem value={1}>Right</MenuItem>
            </Select>
          </div>
          <div className="horizontal-line">
            <p>Type</p>
            <span></span>
          </div>
          <div className="link-label">
            <Select
              onChange={(e) => setNewLink({ ...newLink, direction: e.target.value as any })}
            >
              <MenuItem value={'order'}>order</MenuItem>
              <MenuItem value={'links_to'}>links to</MenuItem>
            </Select>
          </div>
          <div className="horizontal-line">
            <span></span>
          </div>
          {newLink.target &&
            <div className="node-round">
              <div title={newLink.target.title}>
               <img src={`https://img.youtube.com/vi/${newLink.target.contentId}/default.jpg`} />
              </div>
            </div>
          }
          <Button onClick={createNewLink}>
            Create new link
          </Button>
          <Button onClick={cancelNewLinkCreation}>
            Cancel
          </Button>
        </div>
      </Sidebar>
      <div className="note-element">
        <div
          contentEditable
          tabIndex={0}
          ref={editor}
          className="editor"
          onKeyUp={onKeyDown}
        />
      </div>
    <div className="canvas-wrapper" ref={wrapper}>
      <ForceGraph3D
        ref={instance}
        graphData={{ nodes: nodeController.store.nodes, links: nodeController.store.nodes.length ? nodeController.store.links : [] }}
        width={1280 - 48}
        height={0.8 * window.innerHeight}
        backgroundColor="#f5f5f5"
        nodeLabel='title'
        linkWidth={2}
        linkCurvature={0.25}
        linkDirectionalArrowLength={(link: Link) => link.direction ? 7 : 0}
        linkDirectionalArrowRelPos={1}
        linkCurveRotation={"rotation"}
        linkAutoColorBy={'directed'}
        nodeId="uid"
        onNodeHover={node => wrapper.current.style.cursor = node ? 'pointer' : null }
        onLinkHover={link => wrapper.current.style.cursor = link ? 'pointer' : null }
        nodeThreeObject={({ contentId }) => {
          const loader = new THREE.TextureLoader()
          const imgTexture = loader.load(`http://localhost:8010/proxy/vi/${contentId}/mqdefault.jpg`);
          console.log(imgTexture)
          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(12, 12);

          return sprite;
        }}
        onNodeClick={handleNodeClick}
      />
    </div>
    </Container>
  )
})

const component = process.env.NODE_ENV === 'development' ? hot(Note) : Note

export default component

