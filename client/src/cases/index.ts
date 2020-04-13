import { from as observableFrom, Observable, Subscription } from 'rxjs';
import { isObjectEmpty } from 'helpers/objects'
import { TCommonGateway, TCommonGatewaySingletone } from 'helpers/gateway';
import { firstLowerCase } from 'helpers/strings';

export interface ICases {
  subscriptions: Subscription[]
  states$: Observable<any> // TToDo
  store: any //TToDO
  gateways: TGatewaysObject
  load(gateways: any[]): void // TToDo
  setObservables(): any[] //TToDo
}

export interface ICasesClass {
  new (gateways: TCommonGatewaySingletone[]): ICases;
}

interface TGatewaysObject {
  [key: string]: TCommonGateway
}

export default class Cases implements ICases {
  subscriptions: Subscription[] = []
  states$: Observable<any>
  store: any
  gateways: TGatewaysObject

  constructor(gateways) {
    this.initGateways(gateways);
  }

  // ToDo: can we init Gateways via https://github.com/microsoft/TypeScript/issues/4881
  initGateways(gateways) {
    this.gateways = {}

    for (let gatewayItem of gateways) {
      const gatewayName = firstLowerCase(gatewayItem.customName)

      this.gateways[gatewayName] = gatewayItem();

      if (!this.store) {
        this.store = this.gateways[gatewayName].store
      }
    }
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
