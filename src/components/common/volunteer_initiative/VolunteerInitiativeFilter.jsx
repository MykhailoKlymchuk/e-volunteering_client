import React, { useState } from "react"

const VolunteerInitiativeFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState("")

	const handleSelectChange = (e) => {
		const selectedType = e.target.value
		setFilter(selectedType)

		const filteredVolunteerInitiatives = data.filter((volunteerInitiative) =>
			volunteerInitiative.volunteerInitiativeType.toLowerCase().includes(selectedType.toLowerCase())
		)
		setFilteredData(filteredVolunteerInitiatives)
	}

	const clearFilter = () => {
		setFilter("")
		setFilteredData(data)
	}

	const volunteerInitiativeTypes = ["", ...new Set(data.map((volunteerInitiative) => volunteerInitiative.volunteerInitiativeType))]

	return (
		<div className="input-group mb-3">
			<span className="input-group-text" id="volunteer-initiative-type-filter">
				Фільтрувати волонтерські ініціативи за типом
			</span>
			<select
				className="form-select"
				aria-label="romm type filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">вибрати....</option>
				{volunteerInitiativeTypes.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Очистити фільтр
			</button>
		</div>
	)
}
export default VolunteerInitiativeFilter