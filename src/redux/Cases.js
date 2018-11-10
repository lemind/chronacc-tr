import { store } from 'src/app'

import Rx from 'rxjs'
const { Observable } = Rx;

export default class Cases {
  constructor(){
    this.state = store.getState()
    this.dispatch = store.dispatch
    this.observables = null

    store.subscribe(() => {
      this.state = store.getState()
    })
  }

  setObservables(){
    return []
  }

  getState$() {
    return Observable.from(store)
  }
}
