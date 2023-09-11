import { FunctionComponent, ReactElement } from "react";
import "./Loader.css";

const Loader: FunctionComponent = (): ReactElement => {
    return (
        <div className={"loader"}>Идёт загрузка...</div>
    );
};

export default Loader;