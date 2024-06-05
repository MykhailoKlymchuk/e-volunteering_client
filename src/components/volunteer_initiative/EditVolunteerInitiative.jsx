import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVolunteerInitiativeById, updateVolunteerInitiative } from "../server_api/VolunteerInitiativeApiFunctions.js";

const EditVolunteerInitiative = () => {
    const { id } = useParams();
    const [volunteerInitiative, setVolunteerInitiative] = useState({
        id: "",
        name: "",
        volunteerInitiativeType: "",
        requiredAmount: "",
        coeffOfNecessity: "",
        jarUrlStats: "",
        jarUrl: "",
        publicationDate: "",
        deadlineDate: "",
        description: "",
        organization: null,
        сlosed: false
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchVolunteerInitiative = async () => {
            try {
                const result = await getVolunteerInitiativeById(id);
                setVolunteerInitiative(result);
            } catch (error) {
                setErrorMessage("Error fetching volunteer initiative details");
            }
        };

        fetchVolunteerInitiative();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVolunteerInitiative((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVolunteerInitiative(id, volunteerInitiative);
            setSuccessMessage("Volunteer initiative updated successfully!");
        } catch (error) {
            setErrorMessage("Error updating volunteer initiative");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Додаємо 1, оскільки місяці у JavaScript починаються з 0
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between mb-3">
                <h2>Редагування волонтерської ініціативи</h2>
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
                        value={volunteerInitiative.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Необхідна сума</label>
                    <input
                        type="number"
                        className="form-control"
                        name="requiredAmount"
                        value={volunteerInitiative.requiredAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Посилання на статистику банки</label>
                    <input
                        type="url"
                        className="form-control"
                        name="jarUrlStats"
                        value={volunteerInitiative.jarUrlStats}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Посилання на банку</label>
                    <input
                        type="url"
                        className="form-control"
                        name="jarUrl"
                        value={volunteerInitiative.jarUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Кінцева дата</label>
                    <input
                        type="date"
                        className="form-control"
                        name="deadlineDate"
                        value={formatDate(volunteerInitiative.deadlineDate)}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Опис</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={volunteerInitiative.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="сlosed"
                        checked={volunteerInitiative.сlosed}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Закрито</label>
                </div>
                <button type="submit" className="btn btn-primary">Зберегти</button>
            </form>
        </div>
    );
};

export default EditVolunteerInitiative;
