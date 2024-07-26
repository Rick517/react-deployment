import {useParams, Link} from 'react-router-dom'
import useFetch from '../hooks/useFetch.jsx'
import {debounce} from 'lodash'
import {useEffect} from 'react'

function OpenedTask({makeRequest}) {
  let {id} = useParams();
  const { data:task, setData: setTask, isPending, error } = useFetch('http://localhost:5000/api/task/' + id);

  const saveData = (key, value) => {
    task[key] = value;
    setTask(task);
    console.log('changing data', task)
  };

  const saveForm = () => {
    console.log('saving data', task)
    makeRequest('PUT', task)
  };

  const debouncedSaveForm = debounce(() => {saveForm(); console.log('debouncing save')}, 1000);

  useEffect(() => {
    debouncedSaveForm();

    return (() => {
      setTimeout(() => {debouncedSaveForm.cancel();}, 1001)
    })
  }) 

  console.log('task is', task)
  
  return (
    <div>
      <div>OpenedTask - {id}</div>
      { isPending && <div>Loading...</div>}
      { error && <div>{error}</div> }
      { task.length !== 0 &&
        <form>
          <div>
            <label>Task Description</label>
            <input type="text" value={task.text} onChange={(e) => {saveData('text', e.target.value)}} placeholder='Write a title'/>
          </div> 
          <div>
            <label>Date</label>
            <input type="text" value={task.date} onChange={(e) => {saveData('date', e.target.value)}} placeholder='Your deadline'/>
          </div> 
          <div>
            <input type="checkbox" checked={task.reminder} value={task.reminder} onChange={(e) => {saveData('reminder', e.target.value)}} />
          </div>
        </form> 
      }
      <Link to='/react-deployment/'>Back</Link>
    </div>

  )
}

export default OpenedTask