import React from 'react';
import dayjs from 'dayjs';

import { setObservableConfig, componentFromStream, createEventHandler,
  compose, withHandlers, mapPropsStream } from 'recompose'
import rxjsConfig from 'recompose/rxjsObservableConfig'

// import './Timer.less';

setObservableConfig(rxjsConfig)

import Rx from 'rxjs'

export class TimerDom extends React.Component {

  getTimeBySeconds(seconds) {
    return dayjs(0).set('second', seconds).format('mm:ss')
  }

  render() {
    return (
      <header>
        <div>
          { !this.props.progress
            ? <button onClick={ this.props.onStart }>start</button>
            : <button onClick={ this.props.onStop }>stop</button>
          }
          <div>{ this.getTimeBySeconds(this.props.timer) }</div>
        </div>
      </header>
    )
  };
}

export const enhance = mapPropsStream(props$ => {
  const { handler: startHandler, stream: start$ } = createEventHandler();
  const { handler: stopHandler, stream: stop$ } = createEventHandler();
  const progress$ = Rx.Observable.merge(
    start$.map(() => prev => true),
    stop$.map(() => prev => false))
      .startWith(false)
      .scan((state, changeState) => changeState(state))

  const timer$ = Rx.Observable.merge(
      start$.switchMap(() => Rx.Observable.interval(1000).takeUntil(stop$)).map(() => 1)
    )
    .scan((acc, n) => n === 0 ? 0 : acc + n)
    .startWith(0)

  const res = props$
    .combineLatest(
      progress$,
      timer$,
      (props, progress, timer) => ({
        ...props,
        progress,
        timer,
        onStart: startHandler,
        onStop: stopHandler
      })
    )

  return res
})(TimerDom)

export const Timer = enhance
