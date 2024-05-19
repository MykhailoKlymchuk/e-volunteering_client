import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2>Ласкаво просимо до панелі адміністратора</h2>
            <br />
            <Link to={"/vis"}>vis</Link>
            <br />
            <Link to={"/orgs"}>orgs</Link>
		</section>
	)
}

export default Admin