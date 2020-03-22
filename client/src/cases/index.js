import { from as observableFrom } from 'rxjs';
import { isObjectEmpty } from 'helpers/objects'


export default class Cases {
  constructor(){
    this.subscriptions = []
  }

  load(gateways){
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

  transformServerData(data){
    return data
  }

  /**
   * Overridable
   * Provide subscribe to paricular store's variables
   * example: return [{store: 'projects', variables: ['list', 'error']}]
   */
  setObservables(){
    return []
  }

  getState$() {
    return this.store
      ? observableFrom(this.store)
      : observableFrom([])
  }

  unsubscribe(){
    this.subscriptions.forEach(subscribtion => {
      subscribtion.unsubscribe()
    })
    this.subscriptions = []
  }
}
