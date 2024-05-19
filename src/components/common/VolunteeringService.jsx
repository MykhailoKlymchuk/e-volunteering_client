import React from "react"
import { Row, Col, Card} from "react-bootstrap"
import Header from "./Header"

import { GiDeliveryDrone  } from "react-icons/gi";
import { FaBinoculars } from "react-icons/fa";
import { GiSatelliteCommunication } from "react-icons/gi";
import { FaTabletScreenButton } from "react-icons/fa6";
import { ImHeadphones } from "react-icons/im";




const VolunteeringService = () => {
    return (
        <>
            <div className="mb-2">
                <Header title={""}/>

                <Row className="mt-4">
                    <h4 className="text-center">
						<span className="gap-2">
							<div className="ml-5"/> Наші проекти
						</span>
                    </h4>
                </Row>
                <hr/>

                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <GiDeliveryDrone /> Дрони
                                </Card.Title>
                                <Card.Text>Очі (а іноді і довгі руки Сил оборони) — дрони DJI Mavic 3, 3T</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaBinoculars /> Тепловізори
                                </Card.Title>
                                <Card.Text>Нічний зір Сил оборони щоб бачити ворога тоді, коли він тебе не бачить</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <GiSatelliteCommunication /> Зв’язок
                                </Card.Title>
                                <Card.Text>Збираємо на рації, антени та аксесуари щоб покращити координацію на полі бою</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaTabletScreenButton /> Планшети
                                </Card.Title>
                                <Card.Text>На планшети встановлюється ПЗ, яке забезпечує ефективне виконання бойових завдань</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <ImHeadphones  /> Навушники
                                </Card.Title>
                                <Card.Text>Захист вух однієї з найгрізніших ударних сил Сил оборони — артилеристів</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <hr/>
        </>
    )
}

export default VolunteeringService