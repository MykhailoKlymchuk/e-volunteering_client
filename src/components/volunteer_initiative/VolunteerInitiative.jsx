import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import {getVolunteerInitiatives} from "../server_api/VolunteerInitiativeApiFunctions.js";
import VICard from "./VICard.jsx";
import VolunteerInitiativeFilter from "../common/volunteer_initiative/VolunteerInitiativeFilter.jsx";
import VolunteerInitiativePaginator from "../common/volunteer_initiative/VolunteerInitiativePaginator.jsx";


const VolunteerInitiative = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [visPerPage] = useState(6)
    const [filteredData, setFilteredData] = useState([{id: ""}])

    useEffect(() => {
        setIsLoading(true)
        getVolunteerInitiatives()
            .then((data) => {
                setData(data)
                setFilteredData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [])
    if (isLoading) {
        return <div>Loading volunteer initiatives.....</div>
    }
    if (error) {
        return <div className=" text-danger">Error : {error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredData.length / visPerPage)

    const renderVIs = () => {
        const startIndex = (currentPage - 1) * visPerPage;
        const endIndex = startIndex + visPerPage;
        return filteredData
            .slice(startIndex, endIndex)
            .map((vi, index) => <VICard key={vi.id} vi={vi} index={startIndex + index + 1} />);
    };


    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <VolunteerInitiativeFilter data={data} setFilteredData={setFilteredData}/>
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <VolunteerInitiativePaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>{renderVIs()}</Row>

            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <VolunteerInitiativePaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default VolunteerInitiative