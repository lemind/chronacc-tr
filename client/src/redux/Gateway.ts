import { store } from 'src/redux/store'
import type { TAppStore, TAppDispatch} from 'src/redux/store'

import { from as observableFrom, ObservableInput,
  ObservedValueOf, Observable } from 'rxjs'
import { TRootState } from './root'

export type TInitLoadData = {
  reset: boolean
}

export type TProps = {
  auth: any
}

type TAppStoreObsInp = ObservableInput<any> & TAppStore

export interface IGateway {
  state: TRootState
  dispatch: TAppDispatch
  unsubscribeFromStore: Function
  store: TAppStore
  // TToDo: recheck
  getState$(): Observable<ObservedValueOf<TAppStoreObsInp>>
  unsubscribe(): void
  load(init: TInitLoadData, props: TProps): void //abstract
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

  load(init: TInitLoadData, props: TProps) {}
  serverDataPrepared(data: any) {}

  unsubscribe(): void {
    this.unsubscribeFromStore()
  }

  getState$() {
    return observableFrom<TAppStoreObsInp>(<TAppStoreObsInp>store)
  }
}
