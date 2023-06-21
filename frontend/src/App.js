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
import Admin from './component/Admin';

function App() {
  // Check if user is logged in by looking for a stored value in local storage
  const isLoggedIn = !!localStorage.getItem("loggedInUser");
  const userRole = localStorage.getItem("userRole");

  // Define a custom route component to handle restricted routes
  const RestrictedRoute = ({ path, element }) => {
    if (isLoggedIn) {
      if (userRole === 'Admin') {
        if (path === '/admin') {
          return element;
        } else {
          return <Navigate to="/admin" />;
        }
      } else if (userRole === 'Approver') {
        if (path === '/approver') {
          return element;
        } else {
          return <Navigate to="/approver" />;
        }
      } else if (userRole === 'User') {
        if (path === '/admin' || path === '/approver') {
          return <Navigate to="/list" />;
        } else {
          return element;
        }
      } else {
        return <Navigate to="/list" />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };
  

  const getInitialRoute = () => {
    if (isLoggedIn) {
      if (userRole === 'Admin') {
        return '/admin';
      } else if (userRole === 'Approver') {
        return '/approver';
      } else if (userRole === null) {
        return '/list';
      } else {
        return '/login';
      }
    } else {
      return '/login';
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
          element={<RestrictedRoute path="/list" element={<ListShiftComponent />} />}
        />
        <Route
          path="/shifts"
          element={<RestrictedRoute path="/shifts" element={<ListShiftComponent />} />}
        />
        <Route
          path="/add-shift"
          element={<RestrictedRoute path="/add-shift" element={<AddShiftComponent />} />}
        />
        <Route
          path="/add-shift/:id"
          element={<RestrictedRoute path="/add-shift/:id" element={<AddShiftComponent />} />}
        />
        <Route
          path="/request/:id"
          element={<RestrictedRoute path="/request/:id" element={<RequestComponent />} />}
        />
        <Route
          path="/approver"
          element={<RestrictedRoute path="/approver" element={<ApproverComponent />} />}
        />
        <Route
          path="/admin"
          element={<RestrictedRoute path="/admin" element={<Admin />} />}
        />
        <Route
          path="/"
          element={<Navigate to={getInitialRoute()} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
