import {HashRouter, Route, Routes} from "react-router-dom";
import {AboutPage} from "../pages/AboutPage";
import {HomePage} from "../pages/HomePage";
import {StorePage} from "../pages/StorePage";
import {Register} from "../components/Register";
import {Login} from "../components/Login";
import {VerifyEmail} from "../components/VerifyEmail";
import {Profile} from "../components/Profile";
export function MyBrowserRouter(){
    return <HashRouter>
        <Routes>
            <Route
                // this path will match URLs like
                // - /AboutPage
                path="/AboutPage"
                element={<AboutPage/>}
            />;
            <Route index
                path="/"
                element={<HomePage/>}
            />;
            <Route index
                   path="/Webshop"
                   element={<StorePage/>}
            />;
            <Route index
                   path="/Register"
                   element={<Register/>}
            />;
            <Route index
                   path="/Login"
                   element={<Login/>}
            />;
            <Route index
                   path="/VerifyEmail"
                   element={<VerifyEmail/>}
            />;
            <Route index
                   path="/Profile"
                   element={<Profile/>}
            />;
        </Routes>

    </HashRouter>
}
