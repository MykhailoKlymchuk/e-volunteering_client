import {api} from "./ServerApi.js"

/*********************************************VolunteerInitiative****************************************************/

/*
 * this function adds a new VolunteerInitiative
 * @returns
 */
export async function addVolunteerInitiative(
    name, volunteerInitiativeType, requiredAmount, jarUrl, jarUrlStats, description
) {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("volunteerInitiativeType", volunteerInitiativeType)
    formData.append("requiredAmount", requiredAmount)
    formData.append("jarUrl", jarUrl)
    formData.append("jarUrlStats", jarUrlStats)
    formData.append("description", description)

    const response = await api.post("/vis/add/new-vi", formData)
    if (response.status === 201) {
        return true
    } else {
        return false
    }
}

/*
 * this function returns organizations from backend
 */
export async function getVolunteerInitiatives() {
    try {
        const result = await api.get("/vis/all-volunteer-initiative")
        console.log(result.data)
        return result.data
    } catch (error) {
        throw new Error("Error fetching volunteer-initiatives")
    }
}

/* This function gets all location from the database */
export async function getVolunteerInitiativeType() {
    try {
        const response = await api.get("/vis/vi/types")
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error("Error fetching organization locations")
    }
}


// Ваша функція для отримання amount
export async function getAmountFromUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.amount;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


export async function closeVI(viId) {
    try {
        const result = await api.put(`/vis/vi/${viId}/close`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling  :${error.message}`)
    }
}

export async function getVolunteerInitiativeById(Id) {
    try {
        const result = await api.get(`/vis/vi/${Id}`)
        console.log(result.data)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}


export async function updateVolunteerInitiative(id, updatedData) {
    try {
        const response = await api.put(`/vis/vi/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating volunteer initiative:', error);
        throw error;
    }
}
