import React, { FunctionComponent } from 'react'
import { Node as INode } from '../../interface'
import './node.css'

interface Props {
  tabIndex: number
  data: INode
  addNote(node: INode): void
  onSave(node: INode)
  onDiscard(nodeuid: string)
  onAnnotate(nodeuid: string, data: string)
  onTopic(nodeuid: string, data: string)
}

const Node:FunctionComponent<Props> = ({
  tabIndex,
  data,
  addNote,
  onSave,
  onDiscard,
  onAnnotate,
  onTopic
}) => {
  const thumbnail = `https://img.youtube.com/vi/${data.contentId}/mqdefault.jpg`



  // function onAnnotate (value: string) {
  //   onAnnotate(data.uid, value)
  // }

  // function onTopic (value: string) {
  //   onTopic(data.uid, value)
  // }

  function onEnter (e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.which === 13) {
      addNote(data)
    }
  }

  return (
    <div
      tabIndex={tabIndex}
      className="content-node"
      onKeyDown={onEnter}
    >
      <div className="title">
        <h4>{data.title}</h4>
      </div>
      <img src={thumbnail} />
    </div>
  )
}

export default Node
