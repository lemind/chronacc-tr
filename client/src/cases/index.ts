import { from as observableFrom, Observable,
  Subscription, ObservableInput } from 'rxjs'
import { isObjectEmpty } from 'helpers/objects'
import { TGatewaySingletoneCommon } from 'helpers/gateway'
import { IProjectsGatewayCommon } from "src/redux/projects"
import { ITasksGatewayCommon } from "src/redux/tasks"
import { firstLowerCase } from 'helpers/strings'
import type { TRootState } from 'src/redux/root'
import { TAppStore } from 'src/redux/store'
import { IGateway } from 'src/redux/Gateway'

export interface ICases {
  subscriptions: Subscription[]
  states$: Observable<TRootState>
  store: TAppStore
  gateways: IGatewaysObject
  loadFromGateways(gateways: TLoadGatewayData[]): void
  getState$(): any
  unsubscribe(): void
  setObservables(): TFollowedStoreSchema[] // abstract
  transformServerData(data: any): any // abstract
}

export interface ICasesClass {
  new (gateways: TGatewaySingletoneCommon[]): ICases;
}

// ToDo: we do not check if we have any given gateway
interface IGatewaysObject {
  projectsGateway: IProjectsGatewayCommon,
  tasksGateway: ITasksGatewayCommon,
}

export type TFollowedStoreSchema = {
  store: string,
  variables: string[]
}

type TLoadGatewayData = {
  gateway: IGateway,
  params: {init?: any, name: string}
}

export default class Cases implements ICases {
  subscriptions: Subscription[] = []
  states$: Observable<TRootState>
  store: TAppStore
  gateways: IGatewaysObject = {} as IGatewaysObject

  constructor(gateways: TGatewaySingletoneCommon[]) {
    this.initGateways(gateways);
  }

  // ToDo: can we init Gateways via https://github.com/microsoft/TypeScript/issues/4881
  initGateways(gateways: TGatewaySingletoneCommon[]): void {
    for (let gatewayItem of gateways) {
      const gatewayName = firstLowerCase(gatewayItem.customName)

      this.gateways[gatewayName] = gatewayItem();

      if (!this.store) {
        this.store = this.gateways[gatewayName].store
      }
    }
  }

  loadFromGateways(gateways: TLoadGatewayData[]): void {
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

  transformServerData(data: any): any {
    return data
  }

  /**
   * Overridable
   * Provide subscribe to paricular store's variables
   * example: return [{store: 'projects', variables: ['list', 'error']}]:TFollowedStoreSchema[]
   */
  setObservables(): TFollowedStoreSchema[] {
    return []
  }

  getState$(): any {
    type TAppStoreObsInp = ObservableInput<any> & TAppStore

    return this.store
      ? observableFrom<TAppStoreObsInp>(<TAppStoreObsInp>this.store)
      : observableFrom([])
  }

  unsubscribe(): void {
    this.subscriptions.forEach(subscribtion => {
      subscribtion.unsubscribe()
    })
    this.subscriptions = []
  }
}
