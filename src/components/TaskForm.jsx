import { useState } from 'react'

function TaskForm({ onAdd }) {
    const [text, setText] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        if (!text.trim()) {
            return
        }

        onAdd(text)
        setText('')
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="new-task">New task</label>
            <div className="task-form-controls">
                <input id="new-task" name="task" type="text" placeholder="What needs to be done?"
                    value={text} onChange={event => setText(event.target.value)} />
                <button type="submit" disabled={!text.trim()}>Add task</button>
            </div>
        </form>
    )
}

export default TaskForm
