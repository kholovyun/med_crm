import { Middleware, combineReducers, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authReducer, { logout } from "../features/authSlice";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        if (action.payload.originalStatus === 401 || action.payload.status === 401) {
            store.dispatch(logout());
            window.location.href = "/login";
        } else if (action.payload.originalStatus === 403 || action.payload.status === 403) {
            window.location.href = "/404";
        } else if (action.payload.status === "FETCH_ERROR") {
            toast.error("Ошибка соединения");
        }
    }
    return next(action);
};

const rootReducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(api.middleware).concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;