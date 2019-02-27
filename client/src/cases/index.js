import Rx from 'rxjs'
const { Observable } = Rx;

export default class Cases {
  setObservables(){
    return []
  }

  getState$() {
    return this.store
      ? Observable.from(this.store)
      : Observable.from([])
  }
}
