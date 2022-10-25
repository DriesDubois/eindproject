import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AboutPage} from "../pages/AboutPage";
import {HomePage} from "../pages/HomePage";
export function MyBrowserRouter(){
    return <BrowserRouter>
        <Routes>
            <Route
                // this path will match URLs like
                // - /AboutPage
                path="/eindproject/AboutPage"
                element={<AboutPage/>}
            />;
            <Route
                path="/eindproject"
                element={<HomePage/>}
            />;
        </Routes>

    </BrowserRouter>
}
