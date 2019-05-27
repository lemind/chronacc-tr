import { Observable } from 'rxjs'
import { isObjectEmpty } from 'helpers/objects'


export default class Cases {
  constructor(props){
    this.states$

    this.subscribtions = []
  }

  load(gateways){
    gateways.forEach(gatewayObject => {
      const { gateway, params } = gatewayObject

      gateway.load(params.init)

      this.states$ = gateway.getState$()

      const subscription = this.states$.subscribe(data => {
        if (!isObjectEmpty(data.tasks.serverData)) {
          const transformedData = this.transformServerData(data)

          gateway.serverTasksPrepared(transformedData)
        }

        return data
      })

      this.subscribtions.push(subscription)

    })
  }

  transformServerData(){}

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
      ? Observable.from(this.store)
      : Observable.from([])
  }

  unsubscribe(){
    this.subscribtions.forEach(subscribtion => {
      subscribtion.unsubscribe()
    })
    this.subscribtions = []
  }
}
