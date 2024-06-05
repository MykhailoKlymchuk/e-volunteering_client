import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2>Ласкаво просимо до панелі адміністратора</h2>
            <br />
            <Link to={"/vis"}>Ініціативи</Link>
            <br />
            <Link to={"/orgs"}>Організації</Link>
			<br />
			<Link to={"/vis-admin"}>Ініціативи адмін панель</Link>
		</section>
	)
}

export default Admin