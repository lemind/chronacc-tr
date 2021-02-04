import React, { useState } from 'react'

import Modal from 'components/common/elements/Modal/Modal'
import EditTaskForm from 'components/pages/home/EditTaskForm/EditTaskForm'

import Task from './Task'
import ScrollLoadTasks from './ScrollLoad'
import { ITask } from 'models/Task'

type TProps = {
  tasks: ITask[]
}

export default function Tasks(props: TProps): JSX.Element {
  const [currentEditableTask, setCurrentEditableTask] = useState<ITask | null>(null)
  const { tasks } = props

  return (
    <div data-test="tasks-list">
      <h3>Your tasks</h3>
      <div className='taskHeader'>
        <div className='taskStartDay'>
          day
        </div>
        <div className='taskProjectNameWrapper'>
          project
        </div>
        <div className='taskDesc'>
          desc
        </div>
        <div className='taskTime'>
          time
        </div>
      </div>
      <ScrollLoadTasks>
        { tasks.map((task, index) =>
          <div key={ task._id } data-test="tasks-list-item">
            <br />
            <Task
              task={ task }
              onEdit={ () => setCurrentEditableTask(task) }
            />
          </div>
        ) }
      </ScrollLoadTasks>

      {currentEditableTask && <Modal
        onClose={ () => setCurrentEditableTask(null) }
        title="Edit task"
      >
        <EditTaskForm
          task={ currentEditableTask }
        />
      </Modal>}
    </div>
  )
}
