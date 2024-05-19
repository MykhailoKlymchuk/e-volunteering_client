import React from "react"
import MainHeader from "../layout/MainHeader"
import VolunteeringService from "../common/VolunteeringService"
import Parallax from "../common/Parallax"

const Home = () => {
	return (
		<section>

			<MainHeader />
			<div className="container">
				<Parallax />
				<VolunteeringService />
			</div>
		</section>
	)
}

export default Home