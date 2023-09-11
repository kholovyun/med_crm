import "./PageLink.css";
import { HTMLProps } from "react";
import clNames from "classnames";

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

const PageLink = ({
    className,
    active,
    disabled,
    children,
    ...otherProps
}: Props): JSX.Element => {
    const customClassName = clNames("page_link", className, {
        active,
        disabled,
    });
  
    if (disabled) {
        return <span className={customClassName}>{children}</span>;
    }
  
    return (
        <a
            className={customClassName}
            aria-current={active ? "page" : undefined}
            {...otherProps}
        >
            {children}
        </a>
    );
};

export default PageLink;