import React from 'react';
// import './Starter.less';

import { Timer } from './../Timer/Timer';

export class Starter extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <header>
        <div>
          <Timer />
        </div>
      </header>
    )
  };
}

