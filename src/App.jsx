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
import {getCookie} from "./API/Cokkie.js";
import Loading from "./components/other/Loading.jsx";

const AppContent = () => {
    const [role, setRole] = useState("");
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    const location = useLocation();
    const hideNavbar = location.pathname.startsWith("/sign");



    const getRole = async () => {
        try {
            const data = await CheckRoleRequest();
            setRole(data.data.data.role);
        } catch (error) {
            console.error("Rol alınamadı", error);
        } finally {
            setIsRoleLoading(false);
        }
    };

    useEffect(() => {
        getRole();
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
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route element={<Home />} path="/" />
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
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;