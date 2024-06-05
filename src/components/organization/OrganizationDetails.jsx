import React, { useEffect, useState } from "react";
import { getOrganizationById } from "../server_api/OrganizationApiFunctions.js";
import { Link, useParams } from "react-router-dom";

const OrganizationDetails = () => {
    const [organization, setOrganization] = useState(null);
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const organizationData = await getOrganizationById(id);
                setOrganization(organizationData);
            } catch (error) {
                console.error("Error fetching organization details:", error);
                setErrorMessage("Error fetching organization details");
            }
        };

        fetchOrganization();
    }, [id]);

    if (errorMessage) {
        return <div className="alert alert-danger" role="alert">{errorMessage}</div>;
    }

    if (!organization) {
        return <div>Loading...</div>;
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderIframe = (tab) => {
        let src;
        switch (tab) {
            case "projects":
                src = "https://docs.google.com/spreadsheets/d/1mZe10GUF6t9Lir3f1WPNItRwXEadQC99W6eBAYRRmZ4/preview?pli=1#gid=1247119526";
                break;
            case "purchases":
                src = "https://docs.google.com/spreadsheets/d/1TI97jTey7WsztOVmTmP-orFZt03BXR-TLOFeiRWwCnE/preview?pli=1";
                break;
            case "property":
                src = "https://docs.google.com/spreadsheets/d/1o55UgQKSMiHgPMsHjefO0NgRVHPPMYdsAsTLTyjnqHc/preview?pli=1";
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
                <h3 className="text-center">{organization.name}</h3>
                <Link to="/" className="btn btn-outline-info">
                    Назад
                </Link>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8"> {/* Збільшуємо ширину контейнера */}
                    <div className="card">
                        <div className="card-body">
                            {organization.photo && (
                                <div className="mb-3 text-center">
                                    <img
                                        src={`data:image/jpeg;base64,${organization.photo}`}
                                        alt="Organization"
                                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="form-label hotel-color">Опис</label>
                                <p>{organization.description}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Місцезнаходження</label>
                                <p>{organization.location}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Електронна пошта</label>
                                <p>{organization.email}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Номер телефону</label>
                                <p>{organization.phoneNumber}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label hotel-color">Адреса банківського рахунку</label>
                                <p>{organization.bankAccountAddress}</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                        <button className="btn btn-outline-primary" onClick={() => handleTabClick("projects")}>
                            Проекти
                        </button>
                        <button className="btn btn-outline-primary" onClick={() => handleTabClick("purchases")}>
                            Закупівлі
                        </button>
                        <button className="btn btn-outline-primary" onClick={() => handleTabClick("property")}>
                            Видача майна
                        </button>
                    </div>
                    <div className="mt-4">
                        {renderIframe(activeTab)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;
