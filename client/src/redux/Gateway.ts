import { store } from 'src/redux/store'

import { from as observableFrom } from 'rxjs';

// ToDo: move to store.ts
type AppStore = typeof store
type AppDispatch = typeof store.dispatch

export interface IGateway {
  state: any
  dispatch: AppDispatch
  unsubscribeFromStore: Function
  store: AppStore
}

export interface IGatewayClass {
  new (): IGateway;
}

export default class Gateway implements IGateway {
  state: any
  dispatch: AppDispatch
  unsubscribeFromStore: Function
  store: AppStore

  constructor() {
    this.state = store.getState()
    this.dispatch = store.dispatch

    this.unsubscribeFromStore = store.subscribe(() => {
      this.state = store.getState()
    })

    this.store = store
  }

  unsubscribe() {
    this.unsubscribeFromStore()
  }

  getState$() {
    return observableFrom(<any>store)
  }
}
