import {
  createBrowserRouter
} from "react-router-dom";

import User from './Components/User'
import Letsee from "./Components/Letsee";

const App = createBrowserRouter([
  {
    path: '/',
    element: <User />
  },
  {
    path: '/advik',
    element: <Letsee />
  }
])

export default App;
