import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginFormModal from "../auth/LoginFormModal";
import SignUpFormModal from "../auth/SignUpFormModal";

const ProfileMenu = () => {
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false)

    let profileMenu;
    if (!user) {
        profileMenu = (
            <div className="profile-drop-down-menu" >
                <LoginFormModal setShowMenu={setShowMenu} />
                <SignUpFormModal setShowMenu={setShowMenu} />
            </div>
        )
    } else if (user) {
        profileMenu = (
            <div className="profile-drop-down-menu">
                <div>
                    <p>Hello {user?.username.length > 10 ? user?.username.slice(0, 10) : user?.username}</p>
                </div>
                <div>
                    <Link to={`/profile/${user?.id}`}>
                        My Profile
                    </Link>
                </div>
                <div>
                    <LogoutButton setShowMenu={setShowMenu} />
                </div>
            </div>
        )
    }

    const toggleMenu = (e) => {
        setShowMenu(!showMenu)
    }


    return (
        <div className="profile-menu-container">
            <div className="profile-menu-button-container">
                <button className="profile-menu-button" id="profile-menu" onClick={toggleMenu}>
                    <i className="fa-solid fa-user" id="profile-menu"></i>
                </button>
            </div>
            {showMenu && profileMenu}
        </div>
    )
}

export default ProfileMenu