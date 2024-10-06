import User from "./User";
import { createBrowserRouter } from "react-router-dom";


const App = createBrowserRouter([
  {
    path: '/',
    element: <User />
  }
])


export default App;
