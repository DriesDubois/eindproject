import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MyNavBar} from "./components/MyNavBar";
import {MyBrowserRouter} from "./fragments/MyBrowserRouter";
import "./services/firebase";


function App() {
    return (
        <>
            <MyNavBar/>
            <MyBrowserRouter/>

    </>
    );
}

export default App;
