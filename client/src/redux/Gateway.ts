import { store } from 'src/redux/store'

import { from as observableFrom } from 'rxjs';

export interface IGateway {
  state: any
  dispatch: any
  observables: any[]
  subscriber: any
  store: any
}

export default class Gateway implements IGateway {
  state: any
  dispatch: any
  observables: any[]
  subscriber: any
  store: any

  constructor() {
    this.state = store.getState()
    this.dispatch = store.dispatch
    this.observables = []
    this.subscriber = {}

    this.subscriber = store.subscribe(() => {
      this.state = store.getState()
    })
    console.log('___', this.subscriber);

    this.store = store
  }

  unsubscribe() {
    this.subscriber.unsubscribe && this.subscriber.unsubscribe()
  }

  setObservables() {
    return []
  }

  getState$() {
    return observableFrom(<any>store)
  }
}
