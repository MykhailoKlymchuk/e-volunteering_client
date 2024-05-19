import React, {useEffect, useState} from "react"
import {getOrganizations} from "../server_api/OrganizationApiFunctions.js"
import {Col, Row} from "react-bootstrap"
import OrganizationFilter from "../common/organization/OrganizationFilter"
import OrganizationPaginator from "../common/organization/OrganizationPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"


const ExistingOrganizations = () => {
    const [organizations, setOrganizations] = useState([{id: "", name: "", organizationType: ""}])
    const [currentPage, setCurrentPage] = useState(1)
    const [organizationsPerPage] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredOrganizations, setFilteredOrganizations] = useState([{id: "", name: "", organizationType: ""}])
    const [selectedOrganizationType, setSelectedOrganizationType] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        fetchOrganizations()
    }, [])

    const fetchOrganizations = async () => {
        setIsLoading(true)
        try {
            const result = await getOrganizations()
            setOrganizations(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedOrganizationType === "") {
            setFilteredOrganizations(organizations)
        } else {
            const filteredOrganizations = organizations.filter((organization) => organization.organizationType === selectedOrganizationType)
            setFilteredOrganizations(filteredOrganizations)
        }
        setCurrentPage(1)
    }, [organizations, selectedOrganizationType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const calculateTotalPages = (filteredOrganizations, organizationsPerPage, organizations) => {
        const totalOrganizations = filteredOrganizations.length > 0 ? filteredOrganizations.length : organizations.length
        return Math.ceil(totalOrganizations / organizationsPerPage)
    }

    const indexOfLastOrganization = currentPage * organizationsPerPage
    const indexOfFirstOrganization = indexOfLastOrganization - organizationsPerPage
    const currentOrganizations = filteredOrganizations.slice(indexOfFirstOrganization, indexOfLastOrganization)

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading existing Organizations</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Organizations</h2>
                        </div>

                        <Row>
                            <Col md={6} className="mb-2 md-mb-0">
                                <OrganizationFilter data={organizations} setFilteredData={setFilteredOrganizations}/>
                            </Col>

                            <Col md={6} className="d-flex justify-content-end">
					<Link to={"/add-org"}>
									<FaPlus /> Add Organization
								</Link>
                            </Col>
                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>-</th>

                            </tr>
                            </thead>

                            <tbody>
                            {currentOrganizations.map((organization) => (
                                <tr key={organization.id} className="text-center">
                                    <td>{organization.id}</td>
                                    <td>{organization.name}</td>
                                    <td>{organization.location}</td>
                                    <td>{organization.description}</td>


                                    <td className="gap-2">

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <OrganizationPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredOrganizations, organizationsPerPage, organizations)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingOrganizations