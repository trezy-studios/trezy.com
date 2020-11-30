// Module imports
import {
	createContext,
	useContext,
} from 'react'
import PropTypes from 'prop-types'






const RadioGroupContext = createContext({
	baseID: '',
	handleChange: () => {},
	currentValue: null,
})

const useRadioGroupContext = () => useContext(RadioGroupContext)





function RadioGroup(props) {
	const {
		children,
		defaultValue,
		id,
		onChange,
		value,
	} = props

	return (
		<RadioGroupContext.Provider
			value={{
				baseID: id,
				onChange,
				currentValue: value || defaultValue,
			}}>
			<ul className="radio-group">
				{children}
			</ul>
		</RadioGroupContext.Provider>
	)
}

RadioGroup.defaultProps = {
	defaultValue: null,
	value: null,
}

RadioGroup.propTypes = {
	children: PropTypes.node.isRequired,
	defaultValue: PropTypes.any,
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.any,
}

export {
	RadioGroup,
	useRadioGroupContext,
}
