import React, {useState} from 'react'
import {addVolunteerInitiative} from "../server_api/VolunteerInitiativeApiFunctions.js"
import VolunteerInitiativeTypeSelector from "../common/volunteer_initiative/VolunteerInitiativeTypeSelector.jsx"


const AddVolunteerInitiative = () => {
    const [newVolunteerInitiative, setNewVolunteerInitiative] = useState({
        name: "",
        volunteerInitiativeType: "",
        requiredAmount: "",
        jarUrl: "",
        jarUrlStats: "",
        description: ""
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleVolunteerInitiativeInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        if (name === "requiredAmount") {
            if (!isNaN(value)) {
                value = parseInt(value)
            } else {
                value = ""
            }
        }

        setNewVolunteerInitiative({...newVolunteerInitiative, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addVolunteerInitiative(
                newVolunteerInitiative.name,
                newVolunteerInitiative.volunteerInitiativeType,
                newVolunteerInitiative.requiredAmount,
                newVolunteerInitiative.jarUrl,
                newVolunteerInitiative.jarUrlStats,
                newVolunteerInitiative.description)

            if (success !== undefined) {
                setSuccessMessage("Запит успішно створенно")
                setNewVolunteerInitiative({
                    name: "",
                    volunteerInitiativeType: "",
                    requiredAmount: "",
                    jarUrl: "",
                    jarUrlStats: "",
                    description: ""
                })
                setErrorMessage("")
            } else {
                setErrorMessage("Error adding new Initiative")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 5000)
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Додати нову ініціативу</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}

                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Заголовок
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={newVolunteerInitiative.name}
                                    onChange={handleVolunteerInitiativeInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="volunteerInitiativeType" className="form-label">
                                    Тип запиту
                                </label>
                                <div>
                                    <VolunteerInitiativeTypeSelector
                                        handleVolunteerInitiativeInputChange={handleVolunteerInitiativeInputChange}
                                        newVolunteerInitiative={newVolunteerInitiative}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="requiredAmount" className="form-label">
                                    Необхідна сума
                                </label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    id="requiredAmount"
                                    name="requiredAmount"
                                    value={newVolunteerInitiative.requiredAmount}
                                    onChange={handleVolunteerInitiativeInputChange}
                                />
                            </div>



                            <div className="mb-3">
                                <label htmlFor="jarUrl" className="form-label">
                                    Посилання на банку збору
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="jarUrl"
                                    name="jarUrl"
                                    value={newVolunteerInitiative.jarUrl}
                                    onChange={handleVolunteerInitiativeInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="jarUrlStats" className="form-label">
                                    Посилання на статистику банки монобанку
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="jarUrlStats"
                                    name="jarUrlStats"
                                    value={newVolunteerInitiative.jarUrlStats}
                                    onChange={handleVolunteerInitiativeInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Опис
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={newVolunteerInitiative.description}
                                    onChange={handleVolunteerInitiativeInputChange}
                                />
                            </div>

                            <div className="d-grid gap-2 d-md-flex mt-2">

                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Опублікувати
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddVolunteerInitiative