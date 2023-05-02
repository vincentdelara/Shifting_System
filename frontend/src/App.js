

import AddShiftComponent from "./component/AddShiftComponent";
import ListShiftComponent from "./component/ListShiftComponent";
import HeaderComponent from "./component/HeaderComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>
      <div className="container">
      <Routes>
      <Route path="/" element={< ListShiftComponent/>} />
      <Route path="/shifts" element={< ListShiftComponent/>} />
      <Route path="/add-shift" element={< AddShiftComponent/>} />
      <Route path="/add-shift/:id" element={< AddShiftComponent/>} />
      </Routes>
      </div>
      

    </BrowserRouter>
  );
}

export default App;