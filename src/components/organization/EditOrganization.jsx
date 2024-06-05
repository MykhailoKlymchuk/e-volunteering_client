import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrganizationById, updateOrganization } from "../server_api/OrganizationApiFunctions.js";

const EditOrganization = () => {
    const { id } = useParams();
    const [organization, setOrganization] = useState({
        id: "",
        name: "",
        location: "",
        description: "",
        bankAccountAddress: "",
        email: "",
        phoneNumber: "",
        photo: null
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const result = await getOrganizationById(id);
                setOrganization(result);
            } catch (error) {
                setErrorMessage("Error fetching organization details");
            }
        };

        fetchOrganization();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const newValue = type === "file" ? files[0] : type === "checkbox" ? checked : value;
        setOrganization((prev) => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in organization) {
                formData.append(key, organization[key]);
            }
            await updateOrganization(id, formData);
            setSuccessMessage("Organization updated successfully!");
        } catch (error) {
            setErrorMessage("Error updating organization");
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between mb-3">
                <h2>Редагувати організацію</h2>
            </div>
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Назва</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={organization.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Місцезнаходження</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={organization.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Опис</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={organization.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Адреса банківського рахунку</label>
                    <input
                        type="text"
                        className="form-control"
                        name="bankAccountAddress"
                        value={organization.bankAccountAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Електронна пошта</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={organization.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Номер телефону</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        value={organization.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Фото</label>
                    <input
                        type="file"
                        className="form-control"
                        name="photo"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Зберегти</button>
            </form>
        </div>
    );
};

export default EditOrganization;
