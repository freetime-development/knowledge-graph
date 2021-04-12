import UserService from "../services/userService";
import UserStore, { States } from "../stores/userStore";


export default class UserController {
  store: UserStore
  service: UserService

  constructor (UserStore: UserStore, UserService: UserService) {
    this.store = UserStore
    this.service = UserService
  }

  getLoggedInUser (): void {
    this.store.setState(States.LOADING)

    const response = this.service.getLoggedInUser()

    response.then((response) => {
      this.store.setUser(response)
    }).catch((error) => {
      this.store.setError("GetUser Error")
      console.log('GetUser Error', error)
    })
  }
}


