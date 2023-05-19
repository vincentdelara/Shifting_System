//vincentdelara

import AddShiftComponent from "./component/AddShiftComponent";
import ListShiftComponent from "./component/ListShiftComponent";
import HeaderComponent from "./component/HeaderComponent";
import RequestComponent from "./component/RequestComponent";
import RequestComponent4 from "./component/RequestComponent4";
import LoginForm from "./component/LoginForm";
import RegistrationForm from "./component/RegistrationForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>
      <div className="container">
      <Routes>
      <Route path="/login" element={< LoginForm/>} />
      <Route path="/" element={< LoginForm/>} />
      <Route path="/register" element={< RegistrationForm/>} />
      <Route path="/list" element={< ListShiftComponent/>} />
      <Route path="/shifts" element={< ListShiftComponent/>} />
      <Route path="/add-shift" element={< AddShiftComponent/>} />
      <Route path="/add-shift/:id" element={< AddShiftComponent/>} />
      <Route path="/request/:id" element={< RequestComponent/>} />
      <Route path="/request4" element={< RequestComponent4/>} />
      </Routes>
      </div>
      

    </BrowserRouter>
  );
}

export default App;
