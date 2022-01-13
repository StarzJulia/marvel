import React from 'react';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div id="header">
            <Link to="/">
                <img src="../images/logo.svg" />
            </Link>
        </div>
    )
}