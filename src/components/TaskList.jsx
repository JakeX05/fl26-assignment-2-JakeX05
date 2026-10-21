import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, onToggle, onDelete }) {
    if (tasks.length === 0) {
        return <p className="empty-state" role="status">No tasks to display.</p>
    }

    return (
        <ul className="tasks" aria-label="Tasks">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>
    )
}

export default TaskList
