import { makeAutoObservable, reaction } from "mobx";
import { Link, Node } from "../interface";

export enum States {
  IDLE, LOADING, SUCCESS, ERROR
}

export default class NodeStore {
  nodes: Node[] = []
  links: Link[] = []
  error: string = ''
  state: States = States.LOADING

  constructor () {
    makeAutoObservable(this)
  }

  setNodes = (nodes: Node[]) => {
    this.nodes = nodes
    if (!this.links.length) {
      this.links = []
    }
    this.setState(States.SUCCESS)
  }

  setError = (err: string) => {
    this.error = err
    this.setState(States.ERROR)
  }

  setState = (state: States) => {
    this.state = state
  }

  addLink = (link: Link) => {
    this.links.push(link)
  }
}
