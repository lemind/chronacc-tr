import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Subscription } from 'rxjs';
import { firstLowerCase } from './strings'
import { ICasesSingletone } from 'helpers/case'
import { IProjectsCases } from 'cases/projects'


const unsubscribe = (subscribtions) => {
  subscribtions.forEach(subscribtion => {
    subscribtion.unsubscribe()
  })
  subscribtions = []
}

// TToDo extend with all data
// parts of store. set by `setObservables`
type TСasesData = {
  [key: string]: any,
}
// TToDo extend with all actions
type TСasesActions = {
  [key: string]: IProjectsCases,
}

type TСasesCommon = TСasesData & TСasesActions

export default function useCases(casesItem: ICasesSingletone): TСasesCommon {
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