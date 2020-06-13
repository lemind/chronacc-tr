import React, { useState, useEffect } from 'react'
import { Subscription } from 'rxjs';
import { firstLowerCase } from './strings'
import { ICasesSingletone } from 'helpers/case'
import { IProjectsCasesCommon } from 'cases/projects'
import { IProjectsState } from 'src/redux/projects/projects.reducer'
import { ITasksState } from 'src/redux/tasks/tasks.reducer'
import { ITasksCasesCommon } from 'cases/tasks'


const unsubscribe = (subscribtions) => {
  subscribtions.forEach(subscribtion => {
    subscribtion.unsubscribe()
  })
  subscribtions = []
}


export type TСasesData = {
  projects: IProjectsState,
  tasks: ITasksState,
}

export type TСasesActions = {
  projectsCases: IProjectsCasesCommon,
  tasksCases: ITasksCasesCommon,
}

type TСasesCommon = TСasesData & TСasesActions

export default function useCases(casesItem: ICasesSingletone): TСasesCommon {
  const [observables, setObservables] = useState<TСasesData>({} as TСasesData)
  const [initedCases, setInitedCases] = useState<TСasesActions>({} as TСasesActions)

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

      setObservables({ ...newObservables } as TСasesData)
    })

    subscribtions = [...subscribtions, subscribtion]

    setInitedCases({...{[caseName]: newCaseItem}} as TСasesActions)

    return () => {
      unsubscribe(subscribtions)
    }
  }, [])

  return {
    ...initedCases,
    ...observables
  }
}
