import React, { useState, useEffect } from 'react'
import { firstLowerCase } from './strings';

const initObservables = (params) => {
  const {
    cases,
    observables, setObservables,
    subscribtions, setSubscribtions,
    initedCases, setInitedCases
  } = params

  for (let caseItem of cases) {
    const caseName = firstLowerCase(caseItem.customName)

    const newCaseItem = {
      [caseName]: caseItem()
    };

    const _observables = newCaseItem[caseName].setObservables()
    const state$ = newCaseItem[caseName].getState$()

    const subscribtion = state$.subscribe((val) => {
      const newObservables = {}
      _observables.forEach(item => {
        newObservables[item.store] = {}
        item.variables.forEach(variable => {
          newObservables[item.store][variable] = val[item.store][variable]
        })
      })

      setObservables({ ...observables, ...newObservables })
    })

    setInitedCases({...initedCases, ...newCaseItem})

    setSubscribtions([...subscribtions, subscribtion])
  }
}

const unsubscribe = ({subscribtions, setSubscribtions}) => {
  subscribtions.forEach(subscribtion => {
    subscribtion.unsubscribe()
  })
  setSubscribtions([])
}

export default function useCases(...cases) {
  const [observables, setObservables] = useState({})
  const [subscribtions, setSubscribtions] = useState([])
  const [initedCases, setInitedCases] = useState({})
  const initParams = {
    cases,
    observables, setObservables,
    subscribtions, setSubscribtions,
    initedCases, setInitedCases
  }

  useEffect(() => {
    initObservables(initParams)

    return () => {
      unsubscribe({subscribtions, setSubscribtions})
    }
  }, [])

  return {
    ...initedCases,
    ...observables
  }
}