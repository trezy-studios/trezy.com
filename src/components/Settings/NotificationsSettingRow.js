// Module imports
import PropTypes from 'prop-types'





// Local imports
import { Switch } from 'components/Switch'
import Input from 'components/Input'





function NotificationsSettingRow(props) {
	const {
		disabled,
		label,
		notifications,
		onChange,
		setting,
	} = props

	return (
		<tr>
			<th scope="row">
				<label>{label}</label>
			</th>

			<td>
				<Switch
					on={notifications[setting]?.textMessage} />
				{/* <Input
					disabled={disabled}
					name={`${setting}:textMessage`}
					onChange={onChange}
					type="checkbox"
					value={notifications[setting]?.textMessage} /> */}
			</td>

			<td>
				<Switch
					on={notifications[setting]?.email} />
				{/* <Input
					disabled={disabled}
					name={`${setting}:email`}
					onChange={onChange}
					type="checkbox"
					value={notifications[setting]?.email} /> */}
			</td>
		</tr>
	)
}

NotificationsSettingRow.defaultProps = {
	disabled: false,
}

NotificationsSettingRow.propTypes = {
	disabled: PropTypes.bool,
	label: PropTypes.string.isRequired,
	notifications: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	setting: PropTypes.string.isRequired,
}

export { NotificationsSettingRow }
