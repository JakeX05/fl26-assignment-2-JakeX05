function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className={`task-row${task.completed ? ' completed' : ''}`}>
            <label className="task">
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
                <span>{task.text}</span>
            </label>
            <button className="delete-button" type="button" aria-label={`Delete ${task.text}`}
                onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    )
}

export default TaskItem
