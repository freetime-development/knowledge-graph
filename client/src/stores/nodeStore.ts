import { makeAutoObservable } from "mobx";
import { Node } from "../interface";

export enum States {
  IDLE, LOADING, SUCCESS, ERROR
}

export default class NodeStore {
  nodes: Node[] = []
  error: string = ''
  state: States = States.LOADING

  constructor () {
    makeAutoObservable(this)
  }

  setNodes = (nodes: Node[]) => {
    this.nodes = nodes
    this.setState(States.SUCCESS)
  }

  setError = (err: string) => {
    this.error = err
    this.setState(States.ERROR)
  }

  setState = (state: States) => {
    this.state = state
  }
}
