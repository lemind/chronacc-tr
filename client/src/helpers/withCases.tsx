import React, { Component } from 'react'
import { firstLowerCase } from 'helpers/strings';
import { ICasesSingletone } from './case';

/**
 * Provides Cases to component.
 *
 * @param {Case} - one Case or multiple
 *
 * @return {React.Component} - Wrapped component with access to Case
 *
 * example: @withCases(ProjectCases), access - this.props.projectCases
 */

// TToDo!
export default function withCases(...cases: ICasesSingletone[]): Function {
  return (ComposedComponent: React.ComponentType) => {
    return class WithCases extends Component<any, any> {
      cases: ICasesSingletone[] | object
      subscribtions: any[]

      constructor(props){
        super(props)

        this.state = {
          observables: {}
        }
        this.subscribtions = []
      }

      componentWillMount() {
        this.cases = {};
        for (let caseItem of cases) {
          const caseName = firstLowerCase(caseItem.customName);
          this.cases[caseName] = caseItem();

          const observables = this.cases[caseName].setObservables()
          const state$ = this.cases[caseName].getState$()

          const subscribtion = state$.subscribe((val) => {
            const newObservables = {}
            observables.forEach(item => {
              newObservables[item.store] = {}
              item.variables.forEach(variable => {
                newObservables[item.store][variable] = val[item.store][variable]
              })
            })

            this.setState({
              observables: { ...this.state.observables, ...newObservables }
            })
          })

          this.subscribtions.push(subscribtion)
        }
      }

      componentWillUnmount(){
        this.subscribtions.forEach(subscribtion => {
          subscribtion.unsubscribe()
        })
        this.subscribtions = []
      }

      render() {
        return (
          <ComposedComponent
            { ...{ ...this.props, ...this.cases, ...this.state.observables } }
          />
        )
      }
    }
  }
}