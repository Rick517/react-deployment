import Button from './Button.jsx'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'

// Here's props (could be access with this name)
function Header({title="Task Manager", onAdd, showAdd}) {
    const onClick = () => {
        console.log('Click.')
    }

    const location = useLocation();

    return <header>
        <h1>{title}</h1>
        {
            location.pathname === "/react-deployment/" && <Button color={["green", "black"][showAdd]} text={["ADD", "CLOSE"][showAdd]} onClick={onAdd} />
        }
        
        {/*<Button color="red" text="Hello" onClick={onClick} />
        <Button color="blue" text="Remove" onClick={onClick} />*/}
    </header>
}

Header.propTypes = {
    title: PropTypes.string
}



export default Header