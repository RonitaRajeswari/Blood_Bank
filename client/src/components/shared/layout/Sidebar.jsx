import React from 'react'
import { UserMenu } from './menus/UserMenu'
import {useLocation, Link} from 'react-router-dom'
import './Layout.css'

const Sidebar = () => {
    const location = useLocation()
  return (
    <div>
      <div className="sidebar mt-14">
        <div className="menu p-3">
            {UserMenu.map((menu) => {
                const isActive = location.pathname === menu.path
                return (
                    <div className={`menu-item ${isActive && 'active'} `} key={menu.name} >
                        <i className={menu.icon}></i>
                        <Link to={menu.path}>{menu.name}</Link>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
