import React, { useState } from "react"

const OrganizationFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState("")

	const handleSelectChange = (e) => {
		const selectedLocation = e.target.value
		setFilter(selectedLocation)

		const filteredOrganizations = data.filter((organization) =>
			organization.location.toLowerCase().includes(selectedLocation.toLowerCase())
		)
		setFilteredData(filteredOrganizations)
	}

	const clearFilter = () => {
		setFilter("")
		setFilteredData(data)
	}

	const locations = ["", ...new Set(data.map((organization) => organization.location))]

	return (
		<div className="input-group mb-3">
			<span className="input-group-text" id="organiation-type-filter">
				Фільтрувати організації за місцем розташування
			</span>
			<select
				className="form-select"
				aria-label="romm location filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">вибрати....</option>
				{locations.map((location, index) => (
					<option key={index} value={String(location)}>
						{String(location)}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Очистити фільтр
			</button>
		</div>
	)
}
export default OrganizationFilter