import React, {useState} from 'react'
import {addOrganization} from "../server_api/OrganizationApiFunctions.js"
import LocationSelector from "../common/organization/LocationSelector.jsx"


const AddOrganization = () => {
    const [newOrganization, setNewOrganization] = useState({
        photo: null,
        name: "",
        location: "",
        email: "",
        phoneNumber: "",
        bankAccountAddress: "",
        description: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleOrganizationInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        setNewOrganization({...newOrganization, [name]: value})
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewOrganization({...newOrganization, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addOrganization(
                newOrganization.photo,
                newOrganization.name,
                newOrganization.location,
                newOrganization.email,
                newOrganization.phoneNumber,
                newOrganization.bankAccountAddress,
                newOrganization.description)

            if (success !== undefined) {
                setSuccessMessage("Your request to create a volunteer organization will be considered in the near future, expect a call and a message to the email address!")
                setNewOrganization({
                    photo: null,
                    name: "",
                    location: "",
                    email: "",
                    phoneNumber: "",
                    bankAccountAddress: "",
                    description: ""
                })
                setImagePreview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Error adding new organization")
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
                        <h2 className="mt-5 mb-2">Add a New Organization</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}

                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">
                                    Місцезнаходження
                                </label>
                                <div>
                                    <LocationSelector
                                        handleOrganizationInputChange={handleOrganizationInputChange}
                                        newOrganization={newOrganization}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Фото організації
                                </label>
                                <input
                                    required
                                    name="photo"
                                    id="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview organization photo"
                                        style={{maxWidth: "400px", maxHeight: "400px"}}
                                        className="mb-3"></img>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Назва організації
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={newOrganization.name}
                                    onChange={handleOrganizationInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Електронна пошта організації
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={newOrganization.email}
                                    onChange={handleOrganizationInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">
                                    Номер телефону організації
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={newOrganization.phoneNumber}
                                    onChange={handleOrganizationInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bankAccountAddress" className="form-label">
                                    Адреса банківського рахунку організації
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="bankAccountAddress"
                                    name="bankAccountAddress"
                                    value={newOrganization.bankAccountAddress}
                                    onChange={handleOrganizationInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Опис організації
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={newOrganization.description}
                                    onChange={handleOrganizationInputChange}
                                />
                            </div>

                            <div className="d-grid gap-2 d-md-flex mt-2">

                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Зареєструвати організацію
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddOrganization