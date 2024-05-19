import React, { useEffect, useState } from "react"
import {getOrganizations} from "../server_api/OrganizationApiFunctions.js";
import { Col, Container, Row } from "react-bootstrap"
import OrganizationCard from "./OrganizationCard.jsx";
import OrganizationFilter from "../common/organization/OrganizationFilter.jsx";
import OrganizationPaginator from "../common/organization/OrganizationPaginator.jsx";


const Organization = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [organizationsPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

	useEffect(() => {
		setIsLoading(true)
		getOrganizations()
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
		return <div>Loading organizations.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const totalPages = Math.ceil(filteredData.length / organizationsPerPage)

	const renderOrganizations = () => {
		const startIndex = (currentPage - 1) * organizationsPerPage
		const endIndex = startIndex + organizationsPerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((org) => <OrganizationCard key={org.id} organization={org} />)
	}

	return (
		<Container>
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<OrganizationFilter data={data} setFilteredData={setFilteredData} />
				</Col>

				<Col md={6} className="d-flex align-items-center justify-content-end">
					<OrganizationPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderOrganizations()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<OrganizationPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default Organization