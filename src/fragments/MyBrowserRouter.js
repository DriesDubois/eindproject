import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AboutPage} from "../pages/AboutPage";
export function MyBrowserRouter(){
    return <BrowserRouter>
        <Routes>
            <Route
                // this path will match URLs like
                // - /files
                path="/AboutPage"
                element={<AboutPage/>}
            />;
        </Routes>

    </BrowserRouter>
}
