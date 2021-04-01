import { observer } from 'mobx-react-lite'
import React, { FunctionComponent } from 'react'
import { Node as INode } from '../../interface'
import './node.css'
interface Props {
  tabIndex: number
  data: INode
}

const Node:FunctionComponent<Props> = observer(({
  tabIndex,
  data
}) => {
  const thumbnail = `https://img.youtube.com/vi/${data.contentId}/mqdefault.jpg`

  function onEnter (e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.which === 13) {
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
})

export default Node
