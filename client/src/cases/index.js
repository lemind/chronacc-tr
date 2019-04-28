import { Observable } from 'rxjs'

export default class Cases {
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
}
