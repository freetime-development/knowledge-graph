import NoteService from "../services/noteService";
import NoteStore, { States } from "../stores/noteStore";


export default class NoteController {
  store: NoteStore
  service: NoteService

  constructor (noteStore: NoteStore, noteService: NoteService) {
    this.store = noteStore
    this.service = noteService
  }
}


