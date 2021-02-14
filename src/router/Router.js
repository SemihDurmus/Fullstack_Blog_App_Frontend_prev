import { ContextProvider } from "../context/Context";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProfilePage from "../pages/profile/Profile";

export default function Router() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <ContextProvider>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/about" component={About} exact />
          <Route path="/contact" component={Contact} exact />
          {token ? (
            <>
              <Route path="/profile" component={ProfilePage} exact />
            </>
          ) : (
            <Redirect to="/" />
          )}
          {/* 
            <Route path="/detail/:slug" component={PostDetail} exact />
             */}
          {/* <Route path="/create" component={PostPage} exact/>
              <Route path="/edit/:slug" component={CustomPostPage} exact/> */}
        </Switch>
      </ContextProvider>
    </BrowserRouter>
  );
}
