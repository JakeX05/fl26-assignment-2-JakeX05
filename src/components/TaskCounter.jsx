import checkIcon from '../assets/check_icon.png'

function TaskCounter({ total, completed }) {
    return (
        <p className="task-counter" aria-live="polite" aria-atomic="true">
            <img src={checkIcon} alt="" width="24" height="24" />
            <span aria-label={`${total} total tasks, ${completed} completed`}>{total} / {completed}</span>
        </p>
    )
}

export default TaskCounter
