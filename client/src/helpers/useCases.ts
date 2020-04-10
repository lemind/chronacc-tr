import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Subscription } from 'rxjs';
import { firstLowerCase } from './strings';
import { IProject } from 'models/Project';

const unsubscribe = (subscribtions) => {
  subscribtions.forEach(subscribtion => {
    subscribtion.unsubscribe()
  })
  subscribtions = []
}

// TToDo
type СasesData = {
  [key: string]: any | IProject[],
}

export default function useCases(casesItem: any): СasesData {
  const [observables, setObservables] = useState({})
  const [initedCases, setInitedCases] = useState({})

  useEffect(() => {
    let subscribtions: Subscription[] = []

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