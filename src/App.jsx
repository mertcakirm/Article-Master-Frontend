import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import Profile from "./pages/Profile.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Login from "./pages/Login.jsx";
import MyNotes from "./pages/MyNotes.jsx";
import Favorites from "./pages/Favorites.jsx";
import Admin from "./pages/Admin.jsx";
import Writers from "./pages/Writers.jsx";
import WriterArticles from "./pages/WriterArticles.jsx";
import Navbar from "./components/Navbar.jsx";
import {useEffect, useState} from "react";
import {CheckRoleRequest} from "./API/UserApi.js";
import {deleteCookie, getCookie} from "./API/Cokkie.js";
import Loading from "./components/other/Loading.jsx";
import PopUpNavbar from "./components/PopUpNavbar.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/About.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const AppContent = () => {
    const [role, setRole] = useState("");
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);
    const location = useLocation();
    const hideNavbar = location.pathname.startsWith("/sign");


    const getRole = async () => {
        try {
            const data = await CheckRoleRequest();
            setRole(data.data.data.role);
            if (data.data.data.role === null) {
                deleteCookie("token");
            }
        } catch (error) {
            console.error("Rol alınamadı", error);
        } finally {
            setIsRoleLoading(false);
        }
    };

    useEffect(() => {
            getRole();
        AOS.init({ duration: 1000 });
    }, []);

    const ProtectedRoute = ({ children, requireAdmin = false }) => {
        const token = getCookie("token");
        if (!token) {
            return <Navigate to="/sign/in" replace />;
        }
        if (isRoleLoading) {
            return null;
        }
        if (requireAdmin && role !== "ADMIN") {
            return <Navigate to="/" replace />;
        }
        return children;
    };
    if (isRoleLoading) {
        return <Loading />;
    }


    return (
        <>
            {!hideNavbar && <Navbar popupOpen={popupOpen} setPopupOpen={setPopupOpen} />}
            {popupOpen && <PopUpNavbar setPopupOpen={setPopupOpen} />}

            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<About />} path="/about" />
                <Route element={<Articles />} path="/articles" />
                <Route element={<ArticleDetail />} path="/article/:id" />
                <Route element={<Login />} path="/sign/:type" />
                <Route element={<Login />} path="/sign" />
                <Route element={<Writers />} path="/writers" />
                <Route element={<WriterArticles />} path="/writer/:id" />
                <Route element={<ProtectedRoute><Profile /></ProtectedRoute>} path="/profile" />
                <Route element={<ProtectedRoute><MyNotes /></ProtectedRoute>} path="/my-notes" />
                <Route element={<ProtectedRoute><Favorites /></ProtectedRoute>} path="/favorites" />
                <Route element={<ProtectedRoute requireAdmin={true}><Admin /></ProtectedRoute>} path="/admin" />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer theme="colored" closeOnClick position="bottom-right" autoClose={3000} />
            <AppContent />
        </BrowserRouter>
    );
};

export default App;