import React from "react";

export default interface IModalProps {
    show: boolean
    close: () => void
    children: React.ReactNode
}