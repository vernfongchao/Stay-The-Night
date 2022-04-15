import React, { useState,useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginFormModal from "../auth/LoginFormModal";
import SignUpFormModal from "../auth/SignUpFormModal";

const ProfileMenu = () => {
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false)

    // let ref = useRef()

    // useEffect(()=>{
    //     const click = e => {
    //         if(!ref.current.contains(e.target)){
    //             console.log("clicked")
    //             setShowMenu(false)
    //         }
    //     }
    //     // document.addEventListener("mousedown",(e) => {
    //     //     if(!ref.current.contains(e.target)){
    //     //         setShowMenu(false)
    //     //     }
    //     // })
    //     document.addEventListener("mousedown",click)
    //     // document.addEventListener("mousedown",click)
    //     return()=>{
    //         document.removeEventListener("mousedown", click)
    //     }
    // },[showMenu])


    const toggleMenu = (e) => {
        setShowMenu(!showMenu)
    }

    // onMouseEnter = {() => setShowMenu(true)} onMouseLeave = {() => setShowMenu(false)} 

    let profileMenu;
    if (!user) {
        profileMenu = (
            <div className="profile-drop-down-menu" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} >
                <LoginFormModal setShowMenu={setShowMenu}/>
                <SignUpFormModal setShowMenu={setShowMenu} />
            </div>
        )
    } else if (user) {
        profileMenu = (
            <div className="profile-drop-down-menu" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}  >
                <div>
                    <p>Hello {user?.username.length > 15 ? `${user?.username.slice(0, 15)}...` : user?.username}</p>
                </div>
                <div>
                    <Link className="profile-link" to={`/profiles/${user?.id}`} onClick={toggleMenu} >
                        <span className="profile-link-text">
                            My Profile
                        </span>
                    </Link>
                </div>
                <div>
                    <LogoutButton setShowMenu={setShowMenu} />
                </div>
            </div>
        )
    }



    return (
        <div className="profile-menu-container"  >
            <div className="profile-menu-button-container" >
                <button className="profile-menu-button" id="profile-menu" onClick={toggleMenu} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}  >
                    <i className="fa-solid fa-user" id="profile-menu"></i>
                </button>
            </div>
            {(showMenu) && profileMenu}
        </div>
    )
}

export default ProfileMenu