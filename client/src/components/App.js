import '../App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import Err404 from "./404";
import UpdateQuestion from "./UpdateQuestion";
import AddQuestion from "./AddQuestion";

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const id = useSelector(state => state.question.currentID);
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(auth());
    }, []);

    return (
          <BrowserRouter>
              <NavBar />
              <div className="App">
                  <>
                      <Routes>
                          <Route path="/" element={<Landing/>}/>
                          {!isAuth &&
                              <Route>
                                  <Route path="/login" element={<Login/>}/>
                                  <Route path="/register" element={<Register/>}/>
                                  <Route path="*" element={<Err404/>}/>
                              </Route>
                          }
                          {isAuth &&
                              <Route>
                                  <Route path="/dashboard/" element={<Dashboard/>}/>
                                  <Route path={`/dashboard/${id}`} element={<UpdateQuestion/>}/>
                                  <Route path="/dashboard/add_question" element={<AddQuestion/>}/>
                                  <Route path="*" element={<Err404/>}/>
                              </Route>
                          }
                      </Routes>
                  </>
              </div>
          </BrowserRouter>
    );
}

export default App;
