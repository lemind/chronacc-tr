import { Observable } from 'rxjs'

// ToDo: reconsider
export const debounceUntilChanged = (delay, objectKey, subKey) => source$ => {
  return new Observable(observer => {
    let lastChanged
    let first = true

    return source$
      .map(value => {
        if (first) {
          first = !first
          lastChanged = value[objectKey][subKey]
        }
        return value
      })
      .debounce(value => {
        if (value[objectKey][subKey] !== lastChanged) {
          return Observable
            .timer(delay)
            .do(() => {
              lastChanged = value[objectKey][subKey]
            })
        } else {
          lastChanged = {}
          return Observable.empty()
        }
      })
      .subscribe(observer)
  })
}
