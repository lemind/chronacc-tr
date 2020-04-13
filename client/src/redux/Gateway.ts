import { store } from 'src/redux/store'
import type { TAppStore, TAppDispatch} from 'src/redux/store'

import { from as observableFrom } from 'rxjs';
import { IProjectsGateway } from './projects';

export interface IGateway {
  state: any
  dispatch: TAppDispatch
  unsubscribeFromStore: Function
  store: TAppStore
}

export interface IGatewayClass<T> {
  new (): T;
}

export default class Gateway implements IGateway {
  state: any
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

  unsubscribe() {
    this.unsubscribeFromStore()
  }

  getState$() {
    return observableFrom(<any>store)
  }
}
