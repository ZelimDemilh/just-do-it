import { configureStore } from "@reduxjs/toolkit";
import registry from "./registrySlice"
import signIn from "./signInSlice.js";
import categories from "./categoriesSlice.js";
import task from "./taskSlice.js";
import users from "./usersSlice.js";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

export default configureStore({
  reducer: {
    registry: registry,
    signIn: signIn,
    categories: categories,
    task: task,
    users: users
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
  devTools: true,
});
