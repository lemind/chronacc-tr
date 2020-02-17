import React, { useState, useEffect, useLayoutEffect } from 'react'
import { firstLowerCase } from './strings';

const unsubscribe = (subscribtions) => {
  subscribtions.forEach(subscribtion => {
    subscribtion.unsubscribe()
  })
  subscribtions = []
}

export default function useCases(casesItem) {
  const [observables, setObservables] = useState({})
  const [subscribtions, setSubscribtions] = useState([])
  const [initedCases, setInitedCases] = useState({})

  useEffect(() => {
    let subscribtions = []

    const caseName = firstLowerCase(casesItem.customName)

    const newCaseItem = casesItem()

    const observablesStructure = newCaseItem.setObservables()
    const state$ = newCaseItem.getState$()

    const subscribtion = state$.subscribe((val) => {
      const newObservables = {}
      observablesStructure.forEach(item => {
        newObservables[item.store] = {}
        item.variables.forEach(variable => {
          newObservables[item.store][variable] = val[item.store][variable]
        })
      })

      setObservables({ ...newObservables })
    })

    subscribtions = [...subscribtions, subscribtion]

    setInitedCases({...{[caseName]: newCaseItem}})

    return () => {
      unsubscribe(subscribtions)
    }
  }, [])

  return {
    ...initedCases,
    ...observables
  }
}