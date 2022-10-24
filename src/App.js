import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AboutPage} from "./pages/AboutPage";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        // this path will match URLs like
                        // - /files
                        path="/AboutPage"
                        element={<AboutPage/>}
                    />;
                </Routes>

            </BrowserRouter>
            <a href="/Aboutpage">about us</a>

        </>
    );
}

export default App;
