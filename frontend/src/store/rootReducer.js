import { combineReducers } from "redux";

import user from "../modules/user";

const rootReducer = combineReducers({
    user:  user.reducer
});

export default rootReducer;