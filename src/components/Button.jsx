import PropTypes from 'prop-types'

function Button({color, text, onClick}) {
    return <button style={{backgroundColor: color}} className='btn' onClick={onClick}>
        {text}
    </button>
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default Button