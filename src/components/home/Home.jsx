import React from "react"
import MainHeader from "../layout/MainHeader"
import VolunteeringService from "../common/VolunteeringService"
import Parallax from "../common/Parallax"
import { useLocation } from "react-router-dom"


const Home = () => {
	const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")


	return (
		<section>
			{message && <p className="text-warning px-5">{message}</p>}
			{currentUser && (
				<h6 className="text-success text-center"> Ви увійшли в систему як {currentUser}</h6>
			)}

			<MainHeader />
			<div className="container">
				<Parallax />
				<VolunteeringService />
			</div>
		</section>
	)
}

export default Home