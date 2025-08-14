// frontend/src/App.jsx
import React, { useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import AddUsr from "./Component/Admin/AddUsr/addusr";
import Users from "./Component/Admin/User Details/Users";
import Home from "./Component/Homee/Home";
import AboutUs from "./Component/Admin/AboutUs/AboutUs";
import Admindashboard from "./Component/Admin/Admindashboard/Admindashboard";
import ContactUs from "./Component/Admin/ContactUs/ContactUs";
import Login from "./Component/Login/Login";
import UpdateUser from "./Component/Admin/Updateusers/Updateuser";
import Notifications from "./Component/Admin/NotificationDetails/Notifications";
import PasswordReset from "./Component/Admin/PasswordReset/PasswordResets";
import ResetPassword from "./Component/Admin/ResetPassword/ResetPassword";
import AddNotification from "./Component/Admin/AddNotification/AddNotification";
import UpdateNotification from "./Component/Admin/UpdateNotification/UpdateNotification";

//import for payment gtway
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';

//inventory bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Component/Admin/Profile/Profile';

import AddPasswordRequest from "./Component/Admin/AddPasswordRequest/AddPasswordRequest";
import PasswordDetails from "./Component/Admin/PasswordResetDetails/Passwords";
import UpdatePasswordRequest from "./Component/Admin/UpdatePasswordRequest/UpdatePasswordRequest";
import HelpCenter from "./Component/Admin/HelpCenter/HelpCenter";
import PrivateRoute from "./Component/Admin/PrivateRoute/PrivateRoute";
import Appservices from "./Component/Appservices/service";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomeIM from "./Component/IMcommon/HomeIM";
import Materials from "./Component/IMMaterial/Materials";
import MaterialView from "./Component/IMMaterial/MaterialView";
import Orders from "./Component/IMOrders/Orders";
import OrderView from "./Component/IMOrders/OrderView";
import Supplier from "./Component/IMcommon/Supplier";
import Equipment from "./Component/IMEquipment/Equipment";
import Item from "./Component/IMcommon/Additempage";
import AllocateMaterial from "./Component/IMcommon/AllocateMaterial";
import EquipmentView from "./Component/IMEquipment/EquipmentView";
import Checkinventory from "./Component/IMcommon/Checkinventory";
import UpdateMaterial from "./Component/IMMaterial/UpdateMaterial";
import UpdateEquipment from "./Component/IMEquipment/UpdateEquipment";
import UpdateOrder from "./Component/IMOrders/UpdateOrder";
import SupplierViewOrder from "./Component/IMOrders/SupplierViewOrder";
import Form from "./Component/IMConfirmedOrders/Form";
import TableView from "./Component/IMConfirmedOrders/TableView";
import UpdateStatus from "./Component/IMConfirmedOrders/UpdateStatus";
import History from "./Component/IMConfirmedOrders/History";
import OrderStatus from "./Component/IMOrders/OrderStatus";
import AmountEntryForm from "./Component/PaymentGateway/AmountEntryForm";
import PaymentPage from "./Component/PaymentGateway/PaymentPage";
import PaymentSuccess from "./Component/PaymentGateway/PaymentSuccess";
import PNotifications from "./Component/PaymentGateway/Notifications";

//map
import "leaflet/dist/leaflet.css";

import QShome from "./Component/QS/home";
import Budgetread from "./Component/QS/budget";
import QsTask from "./Component/QS/task";
import Newbudget from "./Component/QS/createbudget";
import UpdateBudget from "./Component/QS/updatebudget";
import QsCommunication from "./Component/QS/communication";
import FOhome from "./Component/FO/fohome";
import FoTask from "./Component/FO/fotask";
import Expenses from "./Component/FO/expenses";
import Newexpense from "./Component/FO/createxpenses";
import UpdateExpenses from "./Component/FO/updateexpense";
import Budgetstatus from "./Component/FO/budgetstatus";
import Focommunicate from "./Component/FO/communicationfo";
import Home1 from "./Component/Home/Home";
import AddProjectDetails from "./Component/AddProjectDetails/AddProjectDetails";
import ScheduleProjectDetails from "./Component/ScheduleProjectDetails/ScheduleProjectDetails";
import UpdateScheduleProjects from "./Component/UpdateScheduleProjects/UpdateScheduleProjects";
import AssignTask from "./Component/AssignTask/AssignTask"; // Add this import
import AssignedTasks from "./Component/AssignedTasks/AssignedTasks"; // Add this import
import UpdateAssignedTask from "./Component/UpdateAssignedTask/UpdateAssignedTask"; // Add this import
import Inventory from "./Component/Inventory/inventory";
import Inventorycreate from "./Component/Inventory/createinventory";
import Inventoryupdate from "./Component/Inventory/updateinventory";
import Progressrea from "./Component/Progress/Users";
import ReadPro from "./Component/Progress/UserTableView";
import UPpro from "./Component/Progress/UpdateProgress";
import Passwords from "./Component/Admin/PasswordResetDetails/Passwords";
import ProfileUser from "./Component/ProfileUser/ProfileUser";


// Site Supervisor Components
import SiteSupervisorDashboard from "./Component/SiteSupervisor/ssdash";
import CreateMonitor from "./Component/SiteSupervisor/MonitorOnSite/CreateMonitor";
import ViewMonitors from "./Component/SiteSupervisor/MonitorOnSite/ViewMonitors";
import UpdateMonitor from "./Component/SiteSupervisor/MonitorOnSite/UpdateMonitor";
import Imguploder from "./Component/SiteSupervisor/Imguploder/Imguploder";
import SiteImages from "./Component/SiteSupervisor/SiteImages";
import SupervisorTasks from "./Component/SiteSupervisor/SupervisorTasks";
import Monitoring from "./Component/Monitoring/Monitoring";
import ViewSitePhotos from "./Component/Monitoring/ViewSitePhotos";


//client and project progress
import Feedbacks from './Component/FeedbackClient/Feedbacks';
import FeedbcackTableView from './Component/FeedbackClient/FeedcackTableView'
import FeedbackUpdateForm from './Component/FeedbackClient/FeedbackUpdateForm';
import UpdateRequirementForm from "./Component/RequirementsClient/UpdateRequirementForm"
import RequirementsTableView from './Component/RequirementsClient/RequirementsTableView';
import Requirements from './Component/RequirementsClient/Requirements';
import Client from './Component/ClientCommon/Client';
import ClientProgress from './Component/ClientCommon/ClientProgress';
import Homepage from './Component/Home/Home';
import UserTableView from './Component/Progress/UserTableView'


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const protectedRoutes = [
    "/admindash",
    "/addusr",
    "/userdetails",
    "/userdetails/:id",
    "/clientdash",
    "/supplierdash",
    "/ssdash",
    "/sitesupervisor"
  ];

  //payment gtway
  const stripePromise = loadStripe("pk_test_51R8NoCSBlInf359dsUzjsTVOx5Sk64cP9ioDVGIXtMmx5lCW6eTgGpLgEObCs5mpnsMPpxWowCZCXnwKdzZp7sCq00DXXsi0Wg");

  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route.split(":")[0])
  );

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handlePopstate = useCallback(
    debounce(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        navigate("/log", { replace: true });
      }
    }, 300),
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [handlePopstate]);

  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/log" element={<Login />} />
          <Route path="/passRe" element={<PasswordReset />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/service" element={<Appservices />} />
          <Route path="/passReset" element={<AddPasswordRequest/>} />
          <Route path="/passworddetails" element={<Passwords/>} />
          <Route path="/updatepassword/:id" element={<UpdatePasswordRequest/>} />
          <Route path="/notificationdetails" element={<Notifications/>} />
          <Route path="/addnotification" element={<AddNotification/>} />
          <Route path="/notificationdetails/:id" element={<UpdateNotification/>} />
          <Route path="/helpcenter" element={<HelpCenter/>} />
          <Route path="/userprofile" element={<ProfileUser/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path="/passworddetails" element={<PasswordDetails />} />
          <Route path="/add-password" element={<AddPasswordRequest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId?" element={<Profile />} />
          <Route
            path="/admindash"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Admindashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/addusr"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AddUsr />
              </PrivateRoute>
            }
          />
          <Route
            path="/userdetails"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/userdetails/:id"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <UpdateUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/pamdash"
            element={
              <PrivateRoute allowedRoles={["projectManager"]}>
                <Home1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientdash"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <Client />
              </PrivateRoute>
            }
          />
          <Route
            path="/qsdash"
            element={
              <PrivateRoute allowedRoles={["quantitysurveyor"]}>
                <QShome />
              </PrivateRoute>
            }
          />
          <Route
            path="/fodash"
            element={
              <PrivateRoute allowedRoles={["financeofficer"]}>
                <FOhome />
              </PrivateRoute>
            }
          />
          <Route
            path="/imdash"
            element={
              <PrivateRoute allowedRoles={["inventorymanager"]}>
                <HomeIM />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplierdash"
            element={
              <PrivateRoute allowedRoles={["supplier"]}>
                <Supplier />
              </PrivateRoute>
            }
          />

        <Route
          path="/ssdash"
          element={
            <PrivateRoute allowedRoles={["sitesupervisor"]}>
              <SiteSupervisorDashboard/>
            </PrivateRoute>
          }

          />
    
      
          <Route path='/FOhome' element={<FOhome/>}/>
          <Route path='/' element={<QShome/>}/>
          <Route path='/QShome' element={<QShome/>}/>
          <Route path='/Budget' element={<Budgetread/>}/>
          <Route path='/task' element={<QsTask/>}/>
          <Route path='/Newbudget' element={<Newbudget/>}/>
          <Route path='/Newbudget/:userId' element={<Newbudget/>}/>
          <Route path='/Budget/:id' element={<UpdateBudget/>}/>
          <Route path='/Communication' element={<QsCommunication/>}/>
          <Route path='/taskfo' element={<FoTask/>}/>
          <Route path='/Expenses' element={<Expenses/>}/>
          <Route path='/Newexpenses' element={<Newexpense/>}/>
          <Route path='/Expenses/:id' element={<UpdateExpenses/>}/>
          <Route path='/BudgetApprove' element={<Budgetstatus/>}/>
          <Route path='/Communicationfo' element={<Focommunicate/>}/>
          
        {/* Existing routes */}
        <Route path="/" element={<Home1 />} />
        <Route path="/pmhome" element={<Home1 />} />
        <Route path="/AddProjectDetails" element={<AddProjectDetails />} />
        <Route path="/ScheduleProjectDetails" element={<ScheduleProjectDetails />} />
        <Route path="/ScheduleProjectDetails/:id" element={<UpdateScheduleProjects />} />
        
        {/* New Task Management routes */}
        <Route path="/AssignTask" element={<AssignTask />} />
        <Route path="/AssignedTasks" element={<AssignedTasks />} />
        <Route path="/UpdateAssignedTask/:id" element={<UpdateAssignedTask />} />

        <Route path="/addinven" element={<Inventorycreate />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Inventoryup/:_id" element={<Inventoryupdate />} />

        {/* project manager view monitoring */}
        <Route path="/Monitoring" element={<Monitoring />} />
        <Route path="/viewSitePhotos/:id" element={<ViewSitePhotos />} />

        <Route path="/Progress" element={<Progressrea />} />  
        <Route path="/viewprogress" element={<ReadPro />} /> 
        <Route path="/update/:id" element={<UPpro />} />

        <Route path='/HomeIM' element={<HomeIM/>}/>
        <Route path='/Materials' element={<Materials />}/>
        <Route path='/MaterialView' element={<MaterialView/>}/>
        <Route path='/Orders' element={<Orders/>}/>
        <Route path='/OrderView' element={<OrderView/>}/>
        <Route path='/Equipment' element={<Equipment/>}/>
        <Route path='/Item' element={<Item/>}/>
        <Route path='/AllocateMaterial' element={<AllocateMaterial/>}/>
        <Route path='/EquipmentView' element={<EquipmentView/>}/>
        <Route path='/Checkinventory' element={<Checkinventory/>}/>
        <Route path='/UpdateMaterial/:id' element={<UpdateMaterial/>}/>
        <Route path='/UpdateEquipment/:id' element={<UpdateEquipment/>}/>
        <Route path='/UpdateOrder/:id' element={<UpdateOrder/>}/>
        <Route path='/SupplierViewOrder' element={<SupplierViewOrder/>}/>
        <Route path='/Form' element={<Form/>}/>
        <Route path='/TableView' element={<TableView/>}/>
        <Route path='/UpdateStatus/:id' element={<UpdateStatus/>}/>
        <Route path='/History' element={<History/>}/>
        <Route path='/OrderStatus' element={<OrderStatus/>}/>
        <Route path='/Supplier' element={<Supplier/>}/>
        <Route path="/AmountEntryForm" element={<AmountEntryForm />} />
        <Route path="/pay/:amount" element={
          <Elements stripe={stripePromise}>
            <PaymentPage />
          </Elements>
        } />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/PNotifications" element={<PNotifications />} />


        {/* Site Supervisor Routes */}
        <Route path="/site-supervisor" element={<SiteSupervisorDashboard />} />
        <Route path="/site-supervisor/monitor/create/:id" element={<CreateMonitor />} />
        <Route path="/site-supervisor/monitor/create" element={<CreateMonitor />} />
        <Route path="/site-supervisor/monitor/view" element={<ViewMonitors />} />
        <Route path="/site-supervisor/monitor/update/:id" element={<UpdateMonitor />} />
        <Route path="/site-supervisor/Imguploder/Img" element={<Imguploder />} />
        <Route path="/site-supervisor/site-images/:id" element={<SiteImages />} />
        <Route path="/site-supervisor/tasks/view" element={<SupervisorTasks />} /> 


        {/*client,project progress*/}
        <Route path="/Feedbacks" element={<Feedbacks/>}/>
        <Route path="/FeedcackTableView" element={<FeedbcackTableView/>}/>
        <Route path="/update-feedback/:id" element={<FeedbackUpdateForm />} />
        <Route path='/Requirements' element={<Requirements />} />
        <Route path='/RequirementsTableView' element={<RequirementsTableView />} />
        <Route path="/update-requirement/:id" element={<UpdateRequirementForm />} />
        <Route path='/Client' element={<Client />} />
        <Route path='/ClientProgress' element={<ClientProgress />} />
        <Route path='/Homepage' element={<Homepage />} />
        <Route path='/UserTableView' element={<UserTableView />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
