import {BrowserRouter, Route, Routes} from "react-router-dom";
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

const App=()=>{

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Articles />} path="/articles" />
                <Route element={<Profile />} path="/profile" />
                <Route element={<ArticleDetail />} path="/article/:id" />
                <Route element={<Login />} path="/sign/:type" />
                <Route element={<Login />} path="/sign" />
                <Route element={<MyNotes />} path="/my-notes" />
                <Route element={<Favorites />} path="/favorites" />
                <Route element={<Admin />} path="/admin" />
                <Route element={<Writers />} path="/writers" />
                <Route element={<WriterArticles />} path="/writer/:id" />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;