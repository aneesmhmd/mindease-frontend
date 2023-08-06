import React from 'react'
import { Helmet } from 'react-helmet'
import { TasksTable } from '../../Components/Admin/Tasks/TasksTable'

function PsychologicalTasks() {
    return (
        <div>
            <Helmet>
                <title>
                    Psychological Tasks | MindEase
                </title>
            </Helmet>
            <TasksTable />
        </div>
    )
}

export default PsychologicalTasks
