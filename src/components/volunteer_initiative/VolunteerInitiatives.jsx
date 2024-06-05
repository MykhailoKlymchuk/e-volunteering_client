import React, { useState, useEffect } from "react"
import {closeVI, getVolunteerInitiatives} from "../server_api/VolunteerInitiativeApiFunctions.js"
import Header from "../common/Header"
import VolunteerInitiativesTable from "./VolunteerInitiativesTable.jsx";

const VolunteerInitiatives = () => {
    const [viInfo, setViInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setTimeout(() => {
            getVolunteerInitiatives()
                .then((data) => {
                    setViInfo(data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    setError(error.message)
                    setIsLoading(false)
                })
        }, 1000)
    }, [])

    const handleVICancellation = async (viId) => {
        try {
            await closeVI(viId)
            const data = await getVolunteerInitiatives()
            setViInfo(data)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <Header title={"Наявні волонтерські ініціативи"} />
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div>Існуючі волонтерські ініціативи</div>
            ) : (
                <VolunteerInitiativesTable
                    viInfo={viInfo}
                    handleVICancellation={handleVICancellation}
                />
            )}
        </section>
    )
}

export default VolunteerInitiatives