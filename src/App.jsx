import { useState } from 'react'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskCounter from './components/TaskCounter.jsx'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Call Mom', completed: false },
        { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
        { id: 3, text: 'Return the textbook to Josie', completed: false },
        { id: 4, text: 'Buy the new album by Rake', completed: false },
        { id: 5, text: 'Buy a gift card for Dad', completed: false },
    ])
    const [filter, setFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [sidebarVisible, setSidebarVisible] = useState(true)

    function addTask(text) {
        const trimmedText = text.trim()
        if (!trimmedText) {
            return
        }
        const newTask = {
            id: crypto.randomUUID(),
            text: trimmedText,
            completed: false,
        }

        setTasks(currentTasks => [...currentTasks, newTask])
    }

    function toggleTask(id) {
        setTasks(currentTasks => currentTasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed }
            }

            return task
        }))
    }

    function deleteTask(id) {
        setTasks(currentTasks => currentTasks.filter(task => task.id !== id))
    }

    const completedCount = tasks.filter(task => task.completed).length
    const searchText = search.trim().toLowerCase()
    const visibleTasks = tasks.filter(task => {
        if (filter === 'Active' && task.completed) {
            return false
        }

        if (filter === 'Completed' && !task.completed) {
            return false
        }

        return task.text.toLowerCase().includes(searchText)
    })

    return (
        <>
            <header className="topbar">
                <button className="menu-button" type="button" aria-label="Toggle navigation"
                    aria-expanded={sidebarVisible} aria-controls="task-navigation"
                    onClick={() => setSidebarVisible(current => !current)}>
                    <img src={menuIcon} alt="" width="24" height="24" />
                </button>
                <label className="quick-find">
                    <img src={searchIcon} alt="" width="24" height="24" />
                    <input type="search" placeholder="Quick find" aria-label="Search tasks"
                        value={search} onChange={event => setSearch(event.target.value)} />
                </label>
                <TaskCounter total={tasks.length} completed={completedCount} />
            </header>
            <div className="workspace">
                <nav id="task-navigation" className="sidebar" aria-label="Task categories" hidden={!sidebarVisible}>
                    <ul>
                        <li>
                            <a className="nav-item" href="#inbox" aria-current="page">
                                <img src={inboxIcon} alt="" width="24" height="24" />
                                <span>Inbox</span>
                                <span className="task-count">{tasks.length}</span>
                            </a>
                        </li>
                        <li><span className="nav-item">
                            <img src={calendarIcon} alt="" width="24" height="24" />
                            <span>Today</span>
                        </span></li>
                        <li><span className="nav-item">
                            <img src={upcomingIcon} alt="" width="24" height="24" />
                            <span>Upcoming</span>
                        </span></li>
                    </ul>
                </nav>
                <main className="inbox" id="inbox">
                    <h1>Inbox</h1>
                    <div className="filters" role="group" aria-label="Filter tasks">
                        {['All', 'Active', 'Completed'].map(option => (
                            <button key={option} type="button" aria-pressed={filter === option}
                                onClick={() => setFilter(option)}>{option}</button>
                        ))}
                    </div>
                    <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
                    <TaskForm onAdd={addTask} />
                </main>
            </div>
        </>
    )
}

export default App
