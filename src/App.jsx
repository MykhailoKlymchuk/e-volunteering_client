import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Admin from './components/admin/Admin.jsx';
import NavBar from "./components/layout/NavBar.jsx";
import Home from "./components/home/Home.jsx";
import Footer from "./components/layout/Footer.jsx";


import AddOrganization from "./components/organization/AddOrganization"
import ExistingOrganizations from "./components/organization/ExistingOrganizations"
import OrganizationListing from './components/organization/OrganizationListing.jsx';

import AddVolunteerInitiative from './components/volunteer_initiative/AddVolunteerInitiative.jsx';
import ExistingVolunteerInitiative from './components/volunteer_initiative/ExistingVolunteerInitiative.jsx';
import VolunteerInitiativeListing from "./components/volunteer_initiative/VolunteerInitiativeListing.jsx";


function App() {
    return (
        <>
            <main>
                <Router>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/admin" element={<Admin />}/>

                        <Route path="/add-org" element={<AddOrganization />}/>
                        <Route path="/orgs" element={<ExistingOrganizations />}/>
                        <Route path="/browse-all-organizations" element={<OrganizationListing />}/>

                        <Route path="/add-vi" element={<AddVolunteerInitiative />}/>
                        <Route path="/vis" element={<ExistingVolunteerInitiative />}/>
                        <Route path="/browse-all-vi" element={<VolunteerInitiativeListing />}/>


                    </Routes>

                    <Footer/>
                </Router>
            </main>
        </>

    );
}

export default App;
