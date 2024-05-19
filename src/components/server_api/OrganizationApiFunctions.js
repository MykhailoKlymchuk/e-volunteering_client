import { api } from "./ServerApi.js"

/*********************************************Organization****************************************************/ 
/*
 * this function adds a new Organization
 * @returns 
 */
export async function addOrganization(photo, name, location, email,phoneNumber,bankAccountAddress,description) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("name", name)
    formData.append("location", location)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("bankAccountAddress", bankAccountAddress)
    formData.append("description", description)

    const response = await api.post("/organizations/add/new-organization", formData)
    if (response.status === 201) {
        return true
    } else {
        return false
    }

}

/*
 * this function returns organizations from backend
 */
export async function getOrganizations() {
    try {
        const result = await api.get("/organizations/all-organizations")
        return result.data
    } catch (error) {
        throw new Error("Error fetching organizations")
    }
}

/* This function gets all location from the database */
export async function getLocations() {
    try {
        const response = await api.get("/organizations/organization/locations")
        return response.data
    } catch (error) {
        throw new Error("Error fetching organization locations")
    }
}

