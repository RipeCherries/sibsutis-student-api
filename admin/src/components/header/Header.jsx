import React from "react";

import "./header.css";
import Logo from "../images/Logo";

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Logo/>
                    <h1 className="header__logo__title">API-ADMIN</h1>
                </div>
                <div className="header__navigation">
                    <nav>
                        <ul>
                            <li className="header__navigation__item header__navigation__item-active">
                                <a href="/">Главная</a>
                            </li>
                            <li className="header__navigation__item">
                                <a href="/docs">Документация</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;