import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppRouter} from "./AppRouter";

function App() {
  return (
  <>
    <ul>
      <li><a href="http://localhost:3000/pages/HomePage">Home</a></li>
      <li><a href="http://localhost:3000/pages/AboutPage">About us</a></li>
      <li><a href="http://localhost:3000/pages/ProjectsPage">Projects</a></li>
    </ul>

    <AppRouter/>
  </>
  );
}

export default App;
