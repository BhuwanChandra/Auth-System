import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import userReducer from "./reducer";

const store = createStore(userReducer, applyMiddleware(logger, thunk));

export default store;
