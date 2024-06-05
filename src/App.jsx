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
import OrganizationDetails from './components/organization/OrganizationDetails.jsx';

import AddVolunteerInitiative from './components/volunteer_initiative/AddVolunteerInitiative.jsx';
import ExistingVolunteerInitiative from './components/volunteer_initiative/ExistingVolunteerInitiative.jsx';
import VolunteerInitiativeListing from "./components/volunteer_initiative/VolunteerInitiativeListing.jsx";
import VolunteerInitiatives from "./components/volunteer_initiative/VolunteerInitiatives.jsx";

import Login from "./components/auth/Login.jsx";
import Registration from "./components/auth/Registration.jsx";
import Profile from "./components/auth/Profile.jsx";
import Logout from "./components/auth/Logout.jsx";
import {AuthProvider} from "./components/auth/AuthProvider.jsx";
import VolunteerInitiativeDetails from "./components/volunteer_initiative/VolunteerInitiativeDetails.jsx";
import EditVolunteerInitiative from "./components/volunteer_initiative/EditVolunteerInitiative.jsx";
import EditOrganization from "./components/organization/EditOrganization.jsx";


function App() {
    return (
        <AuthProvider>
            <main>
                <Router>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>

                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/profile" element={<Profile/>}/>


                        <Route path="/add-org" element={<AddOrganization/>}/>
                        <Route path="/orgs" element={<ExistingOrganizations/>}/>
                        <Route path="/browse-all-organizations" element={<OrganizationListing/>}/>
                        <Route path="/view-organization/:id" element={<OrganizationDetails/>}/>
                        <Route path="/edit-org/:id" element={<EditOrganization/>}/>

                        <Route path="/add-vi" element={<AddVolunteerInitiative/>}/>
                        <Route path="/vis" element={<ExistingVolunteerInitiative/>}/>
                        <Route path="/vis-admin" element={<VolunteerInitiatives/>}/>
                        <Route path="/browse-all-vi" element={<VolunteerInitiativeListing/>}/>
                        <Route path="/view-vi/:id" element={<VolunteerInitiativeDetails/>}/>
                        <Route path="/edit-vi/:id" element={<EditVolunteerInitiative/>}/>

                        <Route path="/admin" element={<Admin/>}/>

                    </Routes>

                    <Footer/>
                </Router>
            </main>
        </AuthProvider>

    );
}

export default App;
