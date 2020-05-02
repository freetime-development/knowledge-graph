import React, { PureComponent } from 'react'
import { Node as INode } from '../../interface'
import './node.css'

interface Props {
  data: INode
  onSave(node: INode)
  onDiscard(nodeuid: string)
  onAnnotate(nodeuid: string, data: string)
  onTopic(nodeuid: string, data: string)
}

class Node extends PureComponent<Props> {
  render () {
    const node = this.props.data
    const thumbnail = `https://img.youtube.com/vi/${node.contentId}/mqdefault.jpg`
    return (
      <div className="content-node">
        <div className="title">
          <h4>{node.title}</h4>
        </div>
        <img src={thumbnail} />
      </div>
    )
  }

  onAnnotate = (value: string) => {
    this.props.onAnnotate(this.props.data.uid, value)
  }

  onTopic = (value: string) => {
    this.props.onTopic(this.props.data.uid, value)
  }
}

export default Node
