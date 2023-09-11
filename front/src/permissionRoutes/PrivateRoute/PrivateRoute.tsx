import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { FunctionComponent, ReactElement, useEffect } from "react";
import { useLazyCheckTokenQuery } from "../../app/services/users";
import IPrivateRouteProps from "./IPrivateRouteProps";

const PrivateRoute: FunctionComponent<IPrivateRouteProps> = (props: IPrivateRouteProps): ReactElement => {
    const { user } = useAppSelector(state => state.auth);
    const [getNewToken] = useLazyCheckTokenQuery();

    useEffect(() => {
        getNewToken();
    }, []);

    return (
        user && props.allowedRoles.includes(user.role) ?
            <Outlet />
            :
            <Navigate to="/login" />
    );
};

export default PrivateRoute;