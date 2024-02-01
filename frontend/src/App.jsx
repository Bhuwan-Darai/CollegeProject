import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sideBar/sideBar"; // Import Sidebar here
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Students from "./pages/studentsPage/student";
import Accountant from "./pages/accountant/accountant";
import Logout from "./pages/logoutPage/logout";
import FeeStructure from "./pages/feeStructure/feeStructure";
import Login from "./pages/loginPage/Login";
import Payments from "./pages/payment/payment";
import CreateStudent from "./pages/createStudent/createStudent";
import CreateAccountant from "./pages/createAccountant/createAccountant";
import Home from "./pages/homePage/Home";
import Statements from "./pages/statements/statements";
// import SeeDetails from "./pages/seeDetails/seeDetails";
import CreateFeeStructure from "./pages/createFeeStructure/createFeeStr";
import StatementDetails from "./pages/statements/StatementDetails";
import Invoice from "./pages/invoicePage/invoice";
import SendMail from "./pages/sendMail/sendMail";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/students"
          element={
            <Sidebar>
              <Students />
            </Sidebar>
          }
        />
        <Route
          path="/createStudent"
          element={
            <Sidebar>
              <CreateStudent />
            </Sidebar>
          }
        />
        <Route
          path="/accountant"
          element={
            <Sidebar>
              <Accountant />
            </Sidebar>
          }
        />
        <Route
          path="/createAccountant"
          element={
            <Sidebar>
              <CreateAccountant />
            </Sidebar>
          }
        />
        <Route
          path="/feeStructure"
          element={
            <Sidebar>
              <FeeStructure />
            </Sidebar>
          }
        />
        <Route
          path="/statements"
          element={
            <Sidebar>
              <Statements />
            </Sidebar>
          }
        />
        <Route
          path="/invoice"
          element={
            <Sidebar>
              <Invoice />
            </Sidebar>
          }
        />
        <Route
          path="/payment"
          element={
            <Sidebar>
              <Payments />
            </Sidebar>
          }
        />
        <Route
          path="/logout"
          element={
            <Sidebar>
              <Logout />
            </Sidebar>
          }
        />
        <Route
          path="/statements/statementDetails/:id"
          element={
            <Sidebar>
              <StatementDetails />
            </Sidebar>
          }
        />
        <Route
          path="/feeStructure/CreateFee"
          element={
            <Sidebar>
              <CreateFeeStructure />
            </Sidebar>
          }
        />
        <Route
          path="/sendMail"
          element={
            <Sidebar>
              <SendMail />
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Profile />
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
