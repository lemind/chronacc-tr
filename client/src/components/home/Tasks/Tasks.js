import React, { useState } from 'react'

import Modal from 'components/common/elements/Modal/Modal'
import EditTaskForm from 'components/home/EditTaskForm/EditTaskForm'

import Task from './Task'
import ScrollLoadTasks from './ScrollLoad'

export default function Tasks(props){
  const [currentEditableTask, setCurrentEditableTask] = useState(null);
  const { tasks } = props

  return (
    <div>
      <br />
      <h5>Tasks</h5>
      <ScrollLoadTasks>
        { tasks.map((task, index) =>
          <div key={ task._id }>
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
      >
        <EditTaskForm
          task={ currentEditableTask }
        />
      </Modal>}
    </div>
  )
}
