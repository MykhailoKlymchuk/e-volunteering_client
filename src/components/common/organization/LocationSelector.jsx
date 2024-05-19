import React, { useState, useEffect } from "react"
import { getLocations } from "../../server_api/OrganizationApiFunctions.js"


const LocationSelector = ({ handleOrganizationInputChange, newOrganization }) => {
    const [locations, setLocations] = useState([""])

    useEffect(() => {
        getLocations().then((data) => {
            setLocations(data)
        })
    }, [])

    return (
        <>
            {locations.length > 0 && (
                <div>
                    <select
                        required
                        className="form-select"
                        name="location"
                        onChange={(e) => {
                                handleOrganizationInputChange(e)
                        }}
                        value={newOrganization.location}>
						<option value="">Select a location</option>
						{locations.map((location, index) => (
							<option key={index} value={location}>
								{location}
							</option>
						))}
                    </select>
                </div>
            )}
        </>
    )
}

export default LocationSelector