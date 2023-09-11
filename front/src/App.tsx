import { FunctionComponent, ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./containers/UserForms/Login/Login";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./containers/Home/Home";
import AdminPage from "./containers/AdminPage/AdminPage";
import { ERoles } from "./enums/ERoles";
import PrivateRoute from "./permissionRoutes/PrivateRoute/PrivateRoute";
import AllDoctors from "./containers/AdminPage/AdminTables/AllDoctors/AllDoctors";
import DoctorCabinetPage from "./containers/DoctorCabinetPage/DoctorCabinetPage";
import RegisterDoctor from "./containers/UserForms/RegisterUser/RegisterDoctor";
import RegisterAdmin from "./containers/UserForms/RegisterUser/RegisterAdmin";
import RegisterParent from "./containers/UserForms/RegisterParent/RegisterParent.tsx";
import ResetPassword from "./containers/UserForms/ResetPassword/ResetPassword";
import ForgotPassword from "./containers/UserForms/ForgotPassword/ForgotPassword";
import AllAdmins from "./containers/AdminPage/AdminTables/AllAdmins/AllAdmins";
import { ParentCabinetPage } from "./containers/ParentCabinetPage/ParentCabinetPage";
import { NewBornDataForm } from "./containers/UserForms/RegisterChild/NewBornDataForm/NewBornDataForm";
import AdminProfile from "./containers/AdminPage/AdminProfile";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage.tsx";
import { ChildCabinetPage } from "./containers/ChildCabinetPage/ChildCabinetPage";
import AllParents from "./containers/AdminPage/AdminTables/AllParents/AllParents.tsx";
import AllChildren from "./containers/AdminPage/AdminTables/AllChildren/AllChildren.tsx";
import AllReviews from "./containers/AdminPage/AdminTables/AllReviews/AllReviews.tsx";
import EditUserForm from "./containers/UserForms/EditUserForm/EditUserForm.tsx";

const App: FunctionComponent = (): ReactElement => {
    return (
        <BrowserRouter>
            <ToastContainer theme="colored" autoClose={2000} />
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route element={<PrivateRoute allowedRoles={[ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.DOCTOR]} />}>
                        <Route path="/admin-page" element={<AdminPage />}>
                            <Route path="/admin-page/parents" element={<AllParents />} />
                            <Route path="/admin-page/register-parent/:id" element={<RegisterParent />} />
                            <Route path="/admin-page/children" element={<AllChildren />} />
                            <Route element={<PrivateRoute allowedRoles={[ERoles.SUPERADMIN, ERoles.ADMIN]} />}>
                                <Route path="/admin-page/doctors" element={<AllDoctors />} />
                                <Route path="/admin-page/register-doctor" element={<RegisterDoctor />} />
                                <Route path="/admin-page/profile" element={<AdminProfile />} />
                                <Route path="/admin-page/edit-profile" element={<EditUserForm />} />
                                <Route path="/admin-page/reviews" element={<AllReviews />} />
                            </Route>
                            <Route element={<PrivateRoute allowedRoles={[ERoles.SUPERADMIN]} />}>
                                <Route path="/admin-page/admins" element={<AllAdmins />} />
                                <Route path="/admin-page/register-admin" element={<RegisterAdmin />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={[ERoles.SUPERADMIN, ERoles.ADMIN, ERoles.DOCTOR, ERoles.PARENT]} />}>
                        <Route path="/doctor-cabinet/:id" element={<DoctorCabinetPage />} />
                        <Route path="/parent-cabinet/:id" element={<ParentCabinetPage />} />
                        <Route path="/parent-cabinet" element={<ParentCabinetPage />} />
                        <Route path="/child-cabinet/:id" element={<ChildCabinetPage />} />
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={[ERoles.DOCTOR]} />}>
                        <Route path="/cabinet" element={<DoctorCabinetPage />} />
                    </Route>
                    <Route path="/newborn-data/" element={<NewBornDataForm />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;