import React, { useEffect, useState } from 'react'

import useCases from 'helpers/useCases'
import ScrollLoad from 'components/common/elements/ScrollLoad/ScrollLoad'
import TasksCases from 'cases/tasks'

export default function ScrollLoadTasks(props) {
  const { tasksCases, tasks } = useCases(TasksCases)

  const loadMore = () => {
    if (!tasks) return
    tasksCases.load()
  }

  if (!tasks) return null;

  const { loading, hasMore } = tasks
  const { children } = props

  return (
    <ScrollLoad
      loadMore={ () => loadMore() }
      hasMore={ hasMore }
      loading={ loading }
    >
      { children }
    </ScrollLoad>
  )
}
