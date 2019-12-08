import React, { useEffect, useState } from 'react'

import withCases from 'helpers/withCases'
import ScrollLoad from 'components/common/elements/ScrollLoad/ScrollLoad'
import TasksCases from 'cases/tasks'


@withCases(TasksCases)
export default class ScrollLoadTasks extends React.Component {
  loadMore() {
    const { props: { tasks } } = this
    if (!tasks) return

    this.props.tasksCases.load()
  }

  render() {
    const { children } = this.props
    const hasMore = this.props.tasks ? this.props.tasks.hasMore : false
    const { loading } = this.props.tasks

    return (
      <ScrollLoad
        loadMore={ () => this.loadMore() }
        hasMore={ hasMore }
        loading={ loading }
      >
        { children }
      </ScrollLoad>
    )
  }
}
