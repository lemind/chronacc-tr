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
      }

      componentWillMount() {
        this.cases = {};
        for (let caseItem of cases) {
          const caseName = firstLowerCase(caseItem.customName);
          this.cases[caseName] = caseItem();

          const observables = this.cases[caseName].setObservables()
          const state$ = this.cases[caseName].getState$()

          state$.subscribe((val) => {
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
        }
      }

      render() {
        return (
          <ComposedComponent { ...{ ...this.props, ...this.cases, ...this.state.observables } } />
        );
      }
    }
  }
}