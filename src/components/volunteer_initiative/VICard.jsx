import React, {useEffect, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getAmountFromUrl} from "../server_api/VolunteerInitiativeApiFunctions.js";

import { FaFireAlt } from "react-icons/fa";

const VICard = ({vi}) => {
    const [amount, setAmount] = useState(null);

    useEffect(() => {
        const fetchAmount = async () => {
            try {
                const fetchedAmount = await getAmountFromUrl(vi.jarUrlStats);
                setAmount(fetchedAmount / 100);
            } catch (error) {
                console.error('Error fetching amount:', error);
                setAmount(-1);
            }
        };

        fetchAmount();
    }, [vi.jarUrlStats]);

    // Отримайте поточну дату
    const currentDate = new Date();

// Припустимо, що vi.publicationDate має формат "YYYY-MM-DD"
    const publicationDate = new Date("2024-05-15");

// Розрахунок різниці в днях між поточною датою та датою публікації
    const diffInDays = Math.floor((currentDate - publicationDate) / (1000 * 60 * 60 * 24));

// Перевірка, чи дата публікації не пізніше 7 днів
    const isRecentPublication = diffInDays <= 7;

    return (
        <Col key={vi.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color">
                            {isRecentPublication && <FaFireAlt className="ml-2 red-icon" />}
                            {vi.name}
                        </Card.Title>
                        <Card.Title>{vi.volunteerInitiativeType}</Card.Title>
                        <Card.Title className="organization-price">
                            {amount !== null ? `${amount}/${vi.requiredAmount}` : 'Loading...'}
                        </Card.Title>
                        <Card.Text>{vi.description}</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/view-vi/${vi.id}`} className="btn btn-hotel btn-sm">
                            Ознайомитись
                        </Link>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <a href={vi.jarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-hotel btn-sm">
                            Поповнити банку
                        </a>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default VICard;
