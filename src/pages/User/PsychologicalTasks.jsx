import React from 'react'
import { Helmet } from 'react-helmet'
import TasksCard from '../../components/User/PsychologicalTasks/TasksCard'

function PsychologicalTasks() {
    return (
        <div className='min-h-screen pt-20'>
            <Helmet>
                <title>
                    Psychological Tasks | MindEase
                </title>
            </Helmet>
            <TasksCard />
        </div>
    )
}

export default PsychologicalTasks
