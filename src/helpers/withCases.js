import React, {Component} from 'react';
import toLower from 'lodash/toLower'

// ToDo: helper string
const firstLowerCase = (s) => {
  return toLower(s[0]) + s.substr(1);
}

export default function withCases(...cases) {
  return (ComposedComponent) => {
    return class WithCases extends Component {
      componentWillMount() {
        this.cases = {};
        for (let caseItem of cases) {
          const caseName = firstLowerCase(caseItem.caseName);
          this.cases[caseName] = caseItem();
        }
      }

      render() {
        return (
          <ComposedComponent { ...{ ...this.props, ...this.cases } } />
        );
      }
    }
  }
}