import { store } from 'src/app'

export default class Cases {
  constructor(){
    this.state = store.getState()
    this.dispatch = store.dispatch

    store.subscribe(() => {
      this.state = store.getState()
    })
  }
}
