import { from as observableFrom, Observable, Subscription } from 'rxjs';
import { isObjectEmpty } from 'helpers/objects'

export interface ICases {
  subscriptions: Subscription[]
  states$: Observable<any> // TToDo
  store: any //TToDO
  gateways: any
  load(gateways: any[]): void // TToDo
  setObservables(): any[] //TToDo
}

export interface CasesClass {
  new (): ICases;
}
// export type CasesType = typeof Cases
// compare
// console.log('-compare-', CasesType === CasesClass)

export default class Cases implements ICases {
  subscriptions: Subscription[]
  states$: Observable<any>
  store: any
  gateways: any

  constructor() {
    this.subscriptions = []
  }

  load(gateways) {
    gateways.forEach(gatewayObject => {
      const { gateway, params } = gatewayObject
      const { init, name } = params;

      gateway.load(init)

      this.states$ = gateway.getState$()

      const subscription = this.states$.subscribe(data => {
        if (!isObjectEmpty(data[name].serverData)) {
          const transformedData = this.transformServerData(data)

          gateway.serverDataPrepared(transformedData)
        }

        return data
      })

      this.subscriptions.push(subscription)
    })
  }

  transformServerData(data) {
    return data
  }

  /**
   * Overridable
   * Provide subscribe to paricular store's variables
   * example: return [{store: 'projects', variables: ['list', 'error']}]
   */
  setObservables(): any[] {
    return []
  }

  getState$() {
    return this.store
      ? observableFrom(this.store)
      : observableFrom([])
  }

  unsubscribe() {
    this.subscriptions.forEach(subscribtion => {
      subscribtion.unsubscribe()
    })
    this.subscriptions = []
  }
}
