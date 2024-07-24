import {useState} from 'react'

function AddTask({addTask}) {
    const [text, setText] = useState("");
    const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();


        let id = Math.floor(Math.random() * 10 ** 5) + 1;
        
        let newTask = {id, text, data: day, reminder};
        console.log(newTask);

        setText("");
        setDay("");
        setReminder(false);

        addTask(newTask)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Task to do" value={text} onChange={e => setText(e.target.value)} required />
                <input type="text" placeholder="Deadline" value={day} onChange={e => setDay(e.target.value)} />
                <input type="checkbox" value={reminder} checked={reminder} onChange={e => setReminder(e.currentTarget.checked)} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddTask