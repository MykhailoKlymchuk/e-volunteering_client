import React, { useEffect, useState } from "react";
import { getVolunteerInitiativeById } from "../server_api/VolunteerInitiativeApiFunctions";
import { Link, useParams } from "react-router-dom";

const VolunteerInitiativeDetails = () => {
    const [initiative, setInitiative] = useState(null);
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const fetchInitiative = async () => {
            try {
                const initiativeData = await getVolunteerInitiativeById(id);
                setInitiative(initiativeData);
            } catch (error) {
                console.error("Error fetching initiative details:", error);
                setErrorMessage("Error fetching initiative details");
            }
        };

        fetchInitiative();
    }, [id]);

    if (errorMessage) {
        return <div className="alert alert-danger" role="alert">{errorMessage}</div>;
    }

    if (!initiative) {
        return <div>Loading...</div>;
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderIframe = (tab) => {
        let src;
        switch (tab) {
            case "income":
                src = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYhk9GY9cLpCCWoZTTkiri2J_M8Z53GJ9ZzNc_YKwGKYbmnGaUNPfZ6ztte1b8wQ/pubhtml?widget=true&headers=false";
                break;
            default:
                return null;
        }
        return (
            <div style={{ marginTop: "20px" }}>
                <iframe
                    src={src}
                    title={tab}
                    width="100%"
                    height="800px" // Збільшуємо висоту
                    style={{ border: "none" }}
                ></iframe>
            </div>
        );
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-center">{initiative.name}</h3>
                <div>
                    <button className="btn btn-outline-primary" onClick={() => handleTabClick("income")}>
                        Надходження
                    </button>
                    <Link to="/" className="btn btn-outline-info mr-2">
                        Назад
                    </Link>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8"> {/* Збільшуємо ширину контейнера */}
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label hotel-color">Опис</label>
                                <p>{initiative.description}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Тип волонтерської ініціативи</label>
                                <p>{initiative.volunteerInitiativeType}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Необхідна сума</label>
                                <p>{initiative.requiredAmount}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Дата публікації</label>
                                <p>{new Date(initiative.publicationDate).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Кінцевий термін</label>
                                <p>{new Date(initiative.deadlineDate).toLocaleDateString()}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Посилання на банку</label>
                                <p><a href={initiative.jarUrl} target="_blank" rel="noopener noreferrer">{initiative.jarUrl}</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        {renderIframe(activeTab)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerInitiativeDetails;
