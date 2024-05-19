import React, {useEffect, useState} from "react"
import {getVolunteerInitiatives} from "../server_api/VolunteerInitiativeApiFunctions.js"
import {Col, Row} from "react-bootstrap"
import VolunteerInitiativeFilter from "../common/volunteer_initiative/VolunteerInitiativeFilter.jsx"
import VolunteerInitiativePaginator from "../common/volunteer_initiative/VolunteerInitiativePaginator.jsx"
import {FaEdit, FaEye, FaPlus, FaTrashAlt} from "react-icons/fa"
import {Link} from "react-router-dom";

const ExistingVolunteerInitiative = () => {
    const [volunteerInitiatives, setVolunteerInitiatives] = useState([{
        id: "",
        name: "",
        organizationType: ""
    }])
    const [currentPage, setCurrentPage] = useState(1)
    const [volunteerInitiativesPerPage] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredVolunteerInitiatives, setFilteredVolunteerInitiatives] = useState([{
        id: "",
        name: "",
        organizationType: ""
    }])
    const [selectedVolunteerInitiativeType, setSelectedVolunteerInitiativeType] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        fetchVolunteerInitiatives()
    }, [])

    const fetchVolunteerInitiatives = async () => {
        setIsLoading(true)
        try {
            const result = await getVolunteerInitiatives()
            setVolunteerInitiatives(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedVolunteerInitiativeType === "") {
            setFilteredVolunteerInitiatives(volunteerInitiatives)
        } else {
            const filteredVolunteerInitiatives = volunteerInitiatives.filter((vi) => vi.organizationType === selectedVolunteerInitiativeType)
            setFilteredVolunteerInitiatives(filteredVolunteerInitiatives)
        }
        setCurrentPage(1)
    }, [volunteerInitiatives, selectedVolunteerInitiativeType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const calculateTotalPages = (filteredVolunteerInitiatives, volunteerInitiativesPerPage, volunteerInitiatives) => {
        const totalVolunteerInitiatives = filteredVolunteerInitiatives.length > 0 ? filteredVolunteerInitiatives.length : volunteerInitiatives.length
        return Math.ceil(totalVolunteerInitiatives / volunteerInitiativesPerPage)
    }

    const indexOfLastVolunteerInitiative = currentPage * volunteerInitiativesPerPage
    const indexOfFirstVolunteerInitiative = indexOfLastVolunteerInitiative - volunteerInitiativesPerPage
    const currentVolunteerInitiatives = filteredVolunteerInitiatives.slice(indexOfFirstVolunteerInitiative, indexOfLastVolunteerInitiative)

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading existing volunteer initiative</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing volunteer initiative</h2>
                        </div>

                        <Row>
                            <Col md={6} className="mb-2 md-mb-0">
                                <VolunteerInitiativeFilter data={volunteerInitiatives}
                                                           setFilteredData={setFilteredVolunteerInitiatives}/>
                            </Col>

                            <Col md={6} className="d-flex justify-content-end">
                                <Link to={"/add-vi"}>
                                    <FaPlus/> Add vi
                                </Link>
                            </Col>
                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Type</th>
                                <th>requiredAmount</th>
                                <th>Статус</th>
                                <th></th>

                            </tr>
                            </thead>

                            <tbody>
                            {currentVolunteerInitiatives.map((vi) => (
                                <tr key={vi.id} className="text-center">
                                    <td>{vi.id}</td>
                                    <td>{vi.volunteerInitiativeType}</td>
                                    <td>{vi.requiredAmount}</td>
                                    <td>{vi.сlosed === true ? `закрито` : 'триває'}
                                    </td>


                                    <td className="gap-2">

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <VolunteerInitiativePaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredVolunteerInitiatives, volunteerInitiativesPerPage, volunteerInitiatives)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingVolunteerInitiative