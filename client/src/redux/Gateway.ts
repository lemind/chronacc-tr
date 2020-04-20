import { store } from 'src/redux/store'
import type { TAppStore, TAppDispatch} from 'src/redux/store'

import { from as observableFrom, ObservableInput } from 'rxjs'
import { TRootState } from './root'

export interface IGateway {
  state: TRootState
  dispatch: TAppDispatch
  unsubscribeFromStore: Function
  store: TAppStore
  // ToDo: tricky types
  // getState$(): Observable<ObservedValueOf<TAppStore>>
  getState$(): any
  load(init: any): void //abstract
  serverDataPrepared(data: any): void //abstract
}

export interface IGatewayClass<T> {
  new (): T;
}

export default class Gateway implements IGateway {
  state: TRootState
  dispatch: TAppDispatch
  unsubscribeFromStore: Function
  store: TAppStore

  constructor() {
    this.state = store.getState()
    this.dispatch = store.dispatch

    this.unsubscribeFromStore = store.subscribe(() => {
      this.state = store.getState()
    })

    this.store = store
  }

  load() {}
  serverDataPrepared() {}

  unsubscribe() {
    this.unsubscribeFromStore()
  }

  getState$() {
    type TAppStoreObsInp = ObservableInput<any> & TAppStore

    return observableFrom<TAppStoreObsInp>(<TAppStoreObsInp>store)
  }
}
