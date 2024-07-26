import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import About from './components/About.jsx';
import Tasks from './components/Tasks.jsx';
import AddTask from './components/AddTask.jsx';
import OpenedTask from './components/OpenedTask.jsx';
import useFetch from './hooks/useFetch.jsx';
import {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

export default function App() {
  // qq Compare useState and useEffect by their purposes.
    // We use useEffect when we want to do something in the beginning of mounting and at the end, but not during process. During process we simply use uesState. 
  const [showAddTask, setShowAddTask] = useState(0);
  const { data: tasks, setData: setTasks, isPending, error } = useFetch('http://localhost:5000/api');

  async function makeRequest(type, data) {
    await fetch('http://localhost:5000/api', {
      method: type,
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {return result})
    .catch(err => console.log(err));
  }

  const deleteTask = (id) => {
    makeRequest('DELETE', {'id': id});
    setTasks(tasks.filter(task => task.id !== id));
  }

  const switchReminder = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.reminder = !task.reminder;
        makeRequest('PATCH', {'id': id, 'reminder': task.reminder});
      }
      return task
    }))
  }

  const addTask = (task) => {
    makeRequest('POST', {'task': task});
    setTasks([task, ...tasks])
  }

  return <Router>
    <div>
      <Header onAdd={() => {setShowAddTask((showAddTask + 1) % 2)}} showAdd={showAddTask} />
      <Routes>
        <Route path="/react-deployment/" exact element={
          <>
            {showAddTask === 1 && <AddTask addTask={addTask} />}
            {error && <div>{error}</div>}
            {
              isPending ? <div>Loading...</div> : (
                <section>
                  {!error && (tasks.length ? <Tasks tasks={tasks} deleteTask={deleteTask} switchReminder={switchReminder}/> : "Congratulations for great work!")}
                </section>
              )
            }
            <Footer />
          </>
        } />
        <Route path='/react-deployment/about' element={<About />} />
        <Route path='/react-deployment/task/:id' element={<OpenedTask makeRequest={makeRequest} />} />
      </Routes>
    </div>
  </Router>
}