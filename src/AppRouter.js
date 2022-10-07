import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {AboutPage} from "./pages/AboutPage";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="pages/HomePage" element={<HomePage/>}/>

                <Route path="pages/AboutPage" element={<AboutPage/>}/>

            </Routes>


        </BrowserRouter>
    )
}

