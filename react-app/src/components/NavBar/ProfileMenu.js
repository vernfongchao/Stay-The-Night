import React,{useState} from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

const ProfileMenu = () => {
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu]=useState(false)

    let profileMenu;
    if (!user) {
        profileMenu = (
            <div>
                <div>
                    {/* Login Modal */}
                </div>
                <div>
                    {/* Sign up Modal} */}
                </div>
            </div>
        )
    } else if (user) {
        profileMenu = (
            <div>
                <div>
                    {/* Profile Page */}
                </div>
                <div>
                    <LogoutButton />
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
                <button className="profile-menu-button" onClick={toggleMenu}>

                </button>
            </div>
            (showMenu && { profileMenu })
        </div>
    )
}

export default ProfileMenu