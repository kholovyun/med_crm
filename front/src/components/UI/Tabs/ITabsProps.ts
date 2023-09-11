import { ReactElement } from "react";

export default interface ITabsProps {
    children: ReactElement[]
    callbacks?: {(): void} []
}