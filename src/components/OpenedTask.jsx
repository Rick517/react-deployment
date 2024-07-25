import {useParams, Link} from 'react-router-dom'
import {useFetch} from '../hooks/useFetch.jsx'

function OpenedTask() {
  // qq How to grap url params in react?
  let {id} = useParams();
  const { data:task, isPending, error } = useFetch('http://localhost:5000/api/task/' + id);
  
  return (
    <div>
      <div>OpenedTask - {id}</div>
      <Link to='/react-deployment/'>Back</Link>
    </div>

  )
}

export default OpenedTask