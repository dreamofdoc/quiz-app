import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import questionReducer from "./questionReducer";

const rootReducer = combineReducers({
    user: userReducer,
    question: questionReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));