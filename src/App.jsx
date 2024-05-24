import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Home from "./components/Home"
import Officials from "./components/Officials"
import ResidentsRecord from "./components/ResidentsRecord"
import HouseholdRecord from "./components/HouseholdRecord"
import AddOfficials from "./components/AddOfficials"
import EditOfficial from "./components/EditOfficial"
import AddResident from "./components/AddResident"
import EditResident from "./components/EditResident"
import ViewResident from "./components/ViewResident"
import HouseholdMembers from "./components/HouseholdMembers"
import FamilyMember from "./components/FamilyMember"
import Settings from "./components/Settings"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route
            path="/dashboard/brgy-officials"
            element={<Officials />}
          ></Route>
          <Route
            path="/dashboard/residents-record"
            element={<ResidentsRecord />}
          ></Route>
          <Route
            path="/dashboard/household-record"
            element={<HouseholdRecord />}
          ></Route>
          <Route
            path="/dashboard/add-officials"
            element={<AddOfficials />}
          ></Route>
          <Route path="/dashboard/settings" element={<Settings />}></Route>
          <Route
            path="/dashboard/edit-official/:id"
            element={<EditOfficial />}
          ></Route>
          <Route
            path="/dashboard/add-resident"
            element={<AddResident />}
          ></Route>
          <Route
            path="/dashboard/view-resident/:id"
            element={<ViewResident />}
          ></Route>
          <Route
            path="/dashboard/edit-resident/:id"
            element={<EditResident />}
          ></Route>
          <Route
            path="/dashboard/household-members/:house_number"
            element={<HouseholdMembers />}
          ></Route>
          <Route
            path="/dashboard/view-family-member/:id"
            element={<FamilyMember />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
