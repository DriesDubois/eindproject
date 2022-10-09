import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {AboutPage} from "./pages/AboutPage";
import {ProjectsPage} from "./pages/ProjectsPage";
import {PROJECTS_DATA} from "./data/projectsdata";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="pages/HomePage" element={<HomePage/>}/>
                <Route path="pages/AboutPage" element={<AboutPage/>}/>
                <Route path="pages/ProjectsPage" element={<ProjectsPage projects={PROJECTS_DATA}/>}/>

            </Routes>


        </BrowserRouter>
    )
}

