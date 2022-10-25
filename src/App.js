import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MyNavBar} from "./components/MyNavBar";
import {MyBrowserRouter} from "./fragments/MyBrowserRouter";
import "./services/firebase";
import {MyFooter} from "./components/MyFooter";


function App() {
    return (
        <>
            <MyNavBar/>
            <MyBrowserRouter/>
            <MyFooter/>
    </>
    );
}

export default App;
