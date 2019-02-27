import React, {Component} from 'react'
import toLower from 'lodash/toLower'

// ToDo: helper string
const firstLowerCase = (s) => {
  return toLower(s[0]) + s.substr(1);
}

export default function withCases(...cases) {
  return (ComposedComponent) => {
    return class WithCases extends Component {
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
              observables: newObservables
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
          <ComposedComponent { ...{ ...this.props, ...this.cases, ...this.state.observables } } />
        );
      }
    }
  }
}