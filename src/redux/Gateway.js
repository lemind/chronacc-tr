import { store } from 'src/redux/store'

import Rx from 'rxjs'
const { Observable } = Rx;

export default class Gateway {
  constructor(){
    this.state = store.getState()
    this.dispatch = store.dispatch
    this.observables = null

    //ToDo: unsubscribe
    store.subscribe(() => {
      this.state = store.getState()
    })

    this.store = store
  }

  setObservables(){
    return []
  }

  getState$() {
    return Observable.from(store)
  }
}
