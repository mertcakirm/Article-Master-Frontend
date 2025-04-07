import Navbar from "../components/Navbar.jsx";
import RoleRequests from "../components/admin/RoleRequests.jsx";
import User from "../components/admin/User.jsx";
import ArticleAdmin from "../components/admin/ArticleAdmin.jsx";

const Admin = () => {


    return (
        <div>
            <Navbar />
            <div className="page-container mb-5 container-fluid">
                <div className="row justify-content-between row-gap-5 popular-row ">
                    <RoleRequests />
                    <User />
                    <ArticleAdmin />
                </div>
            </div>

        </div>
    );
};

export default Admin;