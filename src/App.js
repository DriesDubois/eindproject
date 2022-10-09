import {
    Routes,
    Route, HashRouter,
} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {MyNavbar} from "./fragments/Navbar";
import {AboutPage} from "./pages/AboutPage";
import {ProjectsPage} from "./pages/ProjectsPage";
import {PROJECTS_DATA} from "./data/projectsdata";
import 'bootstrap/dist/css/bootstrap.min.css';

function ProvidedApp() {

    return (
        <HashRouter>
            <MyNavbar/>
            <Routes>
                <Route path={`/`} element={<HomePage/>}/>
                <Route path={`/HomePage`} element={<HomePage/>}/>
                <Route path={`AboutPage`} element={<AboutPage/>}/>
                <Route path={`ProjectsPage`} element={<ProjectsPage/>}/>
            </Routes>
        </HashRouter>
    )
}


export default function App() {
    return (<ProvidedApp/>

    );
}

