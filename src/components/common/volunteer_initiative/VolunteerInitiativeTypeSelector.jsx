import React, {useState, useEffect} from "react"
import {getVolunteerInitiativeType} from "../../server_api/VolunteerInitiativeApiFunctions.js"

const VolunteerInitiativeTypeSelector = ({ handleVolunteerInitiativeInputChange, newVolunteerInitiative }) => {
    const [viTypes, setViTypes] = useState([""])

    useEffect(() => {
        getVolunteerInitiativeType().then((data) => {
            setViTypes(data)
        })
    }, [])

    return (
        <>
            {viTypes.length > 0 && (
                <div>
                    <select
                        required
                        className="form-select"
                        name="volunteerInitiativeType"
                        onChange={(e) => {
                                handleVolunteerInitiativeInputChange(e)
                        }}
                        value={newVolunteerInitiative.volunteerInitiativeType}>
						<option value="">Виберіть тип</option>
						{viTypes.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
                    </select>
                </div>
            )}
        </>
    )
}

export default VolunteerInitiativeTypeSelector