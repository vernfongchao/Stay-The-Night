import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as FAIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'

import './ProfileNavigation.css'


const ProfileNavigation = () => {
    const { id } = useParams()
    let ref = useRef()
    const [sidebar, setSideBar] = useState(false)
    const user = useSelector(state => state.session.user)

    const showSideBar = () => {
        setSideBar(!sidebar)
    }

    useEffect(() => {
        let handler = (e) => {
            if (!ref.current.contains(e.target)) {
                setSideBar(false)
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])


    return (user?.id === +id &&
        <div className='profile-navigation-page-container' ref={ref}>
            <div className='profile-navigation-menu-icon'>
                <FAIcons.FaBars onClick={showSideBar} className='menu-link' />
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} onClick={showSideBar}>
                <ul className='nav-menu-items' >
                    <li className='nav-bar-toggle'>
                        <AiIcons.AiOutlineClose className='menu-link' />
                    </li>
                    <li className='nav-text'>
                        <NavLink exact to={`/profiles/${id}`} className="menu-link" activeClassName="selected" >
                            <FAIcons.FaUserAlt /> <span className='profile-navigation-nav-menu-text' >Home</span>
                        </NavLink>
                    </li>
                    <li className='nav-text'>
                        <NavLink to={`/profiles/${id}/spots`} className="menu-link" activeClassName="selected" >
                            <FAIcons.FaHouseDamage /> <span className='profile-navigation-nav-menu-text'  >Spots</span>
                        </NavLink>
                    </li>
                    <li className='nav-text'>
                        <NavLink to={`/profiles/${id}/bookings`} className="menu-link" activeClassName="selected">
                            <FAIcons.FaBookOpen /> <span className='profile-navigation-nav-menu-text'>Bookings</span>
                        </NavLink>
                    </li>
                    <li className='nav-text'>
                        <NavLink to={`/profiles/${id}/favorites`} className="menu-link" activeClassName="selected">
                            <AiIcons.AiFillHeart /> <span className='profile-navigation-nav-menu-text'>Favorites</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div >
    )

}




export default ProfileNavigation