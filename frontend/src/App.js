//vincentdelara

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddShiftComponent from "./component/AddShiftComponent";
import ListShiftComponent from "./component/ListShiftComponent";
import HeaderComponent from "./component/HeaderComponent";
import RequestComponent from "./component/RequestComponent";
import LoginForm from "./component/LoginForm";
import RegistrationForm from "./component/RegistrationForm";
import BackgroundComponent from "./component/BackgroundComponent";
import ApproverComponent from './component/ApproverComponent';

function App() {
  // Check if user is logged in by looking for a stored value in local storage
  const isLoggedIn = !!localStorage.getItem("loggedInUser");

  // Define a custom route component to handle restricted routes
  const RestrictedRoute = ({ path, element }) => {
    if (isLoggedIn) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <HeaderComponent />
      <BackgroundComponent />

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/list"
          element={<RestrictedRoute element={<ListShiftComponent />} />}
        />
        <Route
          path="/shifts"
          element={<RestrictedRoute element={<ListShiftComponent />} />}
        />
        <Route
          path="/add-shift"
          element={<RestrictedRoute element={<AddShiftComponent />} />}
        />
        <Route
          path="/add-shift/:id"
          element={<RestrictedRoute element={<AddShiftComponent />} />}
        />
        <Route
          path="/request/:id"
          element={<RestrictedRoute element={<RequestComponent />} />}
        />
         <Route
          path="/approver"
          element={<RestrictedRoute element={<ApproverComponent />} />}
        />
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/list" /> : <LoginForm />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
