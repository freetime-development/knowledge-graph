import { makeAutoObservable } from "mobx";
import { Node } from "../interface";

export enum States {
  IDLE, LOADING, SUCCESS, ERROR
}

export default class NoTeStore {
  notes: any = []
  error: string = ''
  state: States = States.LOADING

  constructor () {
    makeAutoObservable(this)
  }
}
