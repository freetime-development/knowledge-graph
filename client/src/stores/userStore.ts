import { makeAutoObservable } from "mobx";
import { User } from "../interfaces/user";

export enum States {
  IDLE, LOADING, SUCCESS, ERROR
}

export default class UserStore {
  user: User = null
  error: string = ''
  state: States = States.LOADING

  constructor () {
    makeAutoObservable(this)
  }

  setUser = (user: User) => {
    this.user = user
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
