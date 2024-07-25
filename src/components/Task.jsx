import {Link} from 'react-router-dom'

function Task({task, deleteTask, switchReminder}) {
    console.log(task);
    return <div key={task.id} style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1px 10px',
        marginBottom: '1px',
        borderRadius: '3px',
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }} onDoubleClick={() => switchReminder(task.id)} className={task.reminder ? "reminder" : ""}>
                <Link to={`/react-deployment/task/${task.id}`}>
                    <h3>{task.text}</h3>
                    <p>{task.date}</p>
                </Link>
                <i className="fa-solid fa-xmark" onClick={() => deleteTask(task.id)}></i>
            </div>
}

export default Task;