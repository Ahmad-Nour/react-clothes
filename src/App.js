import Home from "./routers/home/home.component";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routers/navigation/navigation";
import Authentication from "./routers/authentication/authentication.component";


const Shop = () => {
  return <h1>Hi, I am Shop page.</h1>
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
