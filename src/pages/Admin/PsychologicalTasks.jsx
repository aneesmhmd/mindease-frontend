import React from 'react'
import { Helmet } from 'react-helmet'
import { TasksTable } from '../../components/Admin/Tasks/TasksTable'

function PsychologicalTasks() {
    return (
        <div>
            <Helmet>
                <title>
                    Psychological Tasks | MindEase
                </title>
            </Helmet>
            <div className='my-8'>
            <TasksTable />
            </div>
        </div>
    )
}

export default PsychologicalTasks
