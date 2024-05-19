import React from "react"

const MainHeader = () => {
	return (
		<header className="header-banner">
			<video className="header-video" autoPlay muted loop>
				<source src="/public/evolunteer.mp4" type="video/mp4" />
			</video>
			<div className="overlay"></div>
			<div className="animated-texts overlay-content">
				<h1>
					Welcome to <span className="hotel-color"> E-Volunteering</span>
				</h1>
				<h4>Automation system for volunteer initiatives</h4>
			</div>
		</header>
	)
}

export default MainHeader