import { of } from 'rxjs';

export const requestFailed = (actions) => (error) => {
  return of(
    actions.requestFailed({
      id: JSON.stringify(error),
      message: JSON.stringify({
        url: error.request.url,
        message: error.message
      }),
    })
  )
}
