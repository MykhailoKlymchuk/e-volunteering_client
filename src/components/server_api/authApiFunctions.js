import {api} from "./ServerApi.js"


export const getHeader = () => {
    const token = localStorage.getItem("token")
    console.log(token)
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

/* This function register a new user */
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data

    } catch (error) {
        if (error.response && error.response.data) {

            throw new Error(error.response.data)

        } else {
            throw new Error(`User registration error : ${error.message}`)
        }
    }
}


/* This function login a registered user */
export async function loginUser(login) {

    try {

        const response = await api.post("/auth/login", login)

        if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            return response.data
        } else {
            return null
        }
    } catch (error) {

        console.error(error)

        return null
    }
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}


/* This isthe function to delete a user */
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}