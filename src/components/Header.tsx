import React from 'react';
import {Link} from "react-router-dom";
import Logo from '../../images/logo.svg';

export default function Header() {
    return (
        <div id="header">
            <Link to="/">
                <img src={Logo} />
            </Link>
        </div>
    )
}