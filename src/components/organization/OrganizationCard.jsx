import React, {useContext} from "react"
import {Card, Col} from "react-bootstrap"
import {Link} from "react-router-dom"

const OrganizationCard = ({organization}) => {
    return (
        <Col key={organization.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
                        <Link to={`/view-organization/${organization.id}`}>
                            <Card.Img
                                variant="top"
                                src={`data:image/png;base64, ${organization.photo}`}
                                alt="Organization Photo"
                                style={{width: "100%", maxWidth: "200px", height: "auto"}}
                            />
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color">{organization.name}</Card.Title>
                        <Card.Text>{organization.description}</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/view-organization/${organization.id}`} className="btn btn-hotel btn-sm">
                            детальніше
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default OrganizationCard