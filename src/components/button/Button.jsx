import PropTypes from 'prop-types'
import classes from './Button.module.css'
export function Button(props) {
    return (
        <>
            <button className={classes.button} {...props}>{props.children}</button>
        </>
    )
}

Button.propTypes = {
    type: PropTypes.string
}