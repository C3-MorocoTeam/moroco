import React, { useContext, useState, createContext } from "react";
import { useHistory, Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/header/header";
import Search from "./components/search/search";
import SignUp from "./components/auth/signUp/Signup";
import Login from "./components/auth/login/Login";
import Post from "./components/post/post";
import Feed from "./components/feed/feed";
import LeftSideBar from "./components/leftSideBar/leftSideBar";
import RightSideBar from "./components/rightSideBar/rightSideBar";
import EditProfile from "./components/editProfile/editProfile";
import Main from "./components/main/main";
import "./components/main/main.css";
import "./App.css";
import { AuthContext } from "./contexts/context";
import Album from "./components/leftSideBar/Album/Album";
import Comments from "./components/comments/Comments";

export const postContext = createContext({ value: [], setValue: () => {} });
export const searchContext = createContext({});
export const imgContext = createContext({});
export const commentContext = createContext({});

const App = () => {
  let { setIsLoggedIn, isLoggedIn, saveToken } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const [value, setValue] = useState([]);
  const [sValue, setsValue] = useState([]);
  const [img, setImg] = useState();
  const [comment, setcomment] = useState();

  return (
    <>
      <div>
        {!isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={SignUp} />
            {/* <Route path="*" component={() => "404 Page Not Found"} /> */}
          </Switch>
        ) : (
          <>
            <searchContext.Provider value={{ sValue, setsValue }}>
              <imgContext.Provider value={{ img, setImg }}>
                <Header />
                <div className="App">
                  <LeftSideBar />
                  <div className="main">
                    <Switch>
                      <Route exact path="/search">
                        <Search />
                      </Route>
                      <Route exact path="/edit">
                        <EditProfile />
                      </Route>
                      <Route exact path="/:postId/comments">
                        <Comments />
                      </Route>
                      <Route exact path="/Album">
                        <Album />
                      </Route>
                      <Route exact path="/Home">
                        <postContext.Provider value={{ value, setValue }}>
                          <commentContext.Provider value={{ comment,setcomment }}>
                            <Feed />
                            <Post />
                          </commentContext.Provider>
                        </postContext.Provider>
                      </Route>
                    </Switch>
                  </div>
                  <RightSideBar />
                </div>
              </imgContext.Provider>
            </searchContext.Provider>
          </>
        )}
      </div>
    </>
  );
};

export default App;
