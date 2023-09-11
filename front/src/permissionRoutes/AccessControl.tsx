import { FunctionComponent, ReactNode } from "react";
import { useAppSelector } from "../app/hooks";

interface AccessControlProps {
  allowedRoles: string[];
  children: ReactNode;
}

const AccessControl: FunctionComponent<AccessControlProps> = ({
    allowedRoles,
    children
}) => {
    const { user } = useAppSelector(state => state.auth);

    if (!user || (user && !allowedRoles.includes(user.role))) {
        return null;
    }

    return <>{children}</>;
};

export default AccessControl;