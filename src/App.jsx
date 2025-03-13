import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import Profile from "./pages/Profile.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";

const App=()=>{

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Articles />} path="/articles" />
                <Route element={<Profile />} path="/profile" />
                <Route element={<ArticleDetail />} path="/articles/:id" />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;