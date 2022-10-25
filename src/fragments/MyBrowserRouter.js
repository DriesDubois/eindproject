import {HashRouter, Route, Routes} from "react-router-dom";
import {AboutPage} from "../pages/AboutPage";
import {HomePage} from "../pages/HomePage";
import {StorePage} from "../pages/StorePage";
export function MyBrowserRouter(){
    return <HashRouter>
        <Routes>
            <Route
                // this path will match URLs like
                // - /AboutPage
                path="AboutPage"
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
        </Routes>

    </HashRouter>
}
