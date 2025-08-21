'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MetisMenu from 'metismenujs';
import Loader from './Loader';
import styles from '../app/Landing.module.css'; 
import { color } from 'framer-motion';
import { useLocalStorageObject } from '../hooks/useLocalStorage';

export default function Header({ pageName, moduleName, userName }: { pageName: string, moduleName: string, userName?: string, }) {
  const menuRef = useRef<HTMLUListElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuName, setMenuName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 
  const [collapsed, setCollapsed] = useLocalStorageObject("collapsed", {isCollapsed: true});
  const [user, setUser] = useLocalStorageObject("user", null)

  const toggleMenu = (menuName: string)=>{
    setMenuName((prev)=> (prev === menuName ? null : menuName))
  }

  useEffect(() => {
    if (menuRef.current) {
      const metis = new MetisMenu(menuRef.current);

      return () => {
        metis.dispose(); // 💥 Clean up MetisMenu instance
      };
    }
  }, []);

//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.classList.add("collapseBody");
      
//     } else {
//       document.body.classList.remove("collapseBody");
//       localStorage.removeItem('collapsed');
//     }
// }, [sidebarOpen]);
   
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [sidebarOpen]);

  // const toggleSidebar = () => {
  //   if (sidebarOpen) {
  //      setSidebarOpen(false);
  //      setCollapsed(collapsed);

  //   } else {
  //      setSidebarOpen(true);
  //      setCollapsed(collapsed);
  //   }
   
  // };


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.classList.toggle('sidebar-collapsed');
  };

  return (
    <div>
      {/* {loading && <Loader />} */}
      {/* Sidebar */}
      <div className={`sidebar-menu `}>
        <div className="sidebar-header">
          <div className="logo">
            <Link href="/">
              <h1 style={{color: "white"}} className={styles.logo}>Skyt<span className={styles.logoAccent}>Assist</span>
        </h1>
            </Link>
          </div>
        </div>
        <div className="main-menu">
          <div className="menu-inner">
            <nav>
              <ul className="metismenu" id="menu" ref={menuRef}>
                <li className="active">
                  <Link href="/dashboard" ><i className="ti-dashboard"></i><span>Dashboard</span></Link>
                </li>
                <li>
                  <Link href="#" ><i className="ti-user"></i><span>Manage Users</span></Link>
                </li>
                <li>
                  <Link href="#" ><i className="ti-dashboard"></i><span>Manage Calls</span></Link>
                </li>
                <li>
                  <Link href="#" ><i className="fa fa-address-book-o"></i><span>Manage Contacts</span></Link>
                </li>
                <li>
                  <Link href="#" ><i className="ti-book"></i><span>Audit</span></Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header-area">
        <div className="row align-items-center">
          <div className="col-md-6 col-sm-8 clearfix">
            <div className="nav-btn pull-left" onClick={toggleSidebar} style={{ cursor: "pointer" }}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="search-box pull-left"></div>
          </div>
          <div className="col-md-6 col-sm-4 clearfix">
            <ul className="notification-area pull-right">
              <li className="dropdown">
                <i className="ti-bell dropdown-toggle" data-toggle="dropdown">
                  <span>2</span>
                </i>
                <div className="dropdown-menu bell-notify-box notify-box">
                  <span className="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                  <div className="nofity-list">
                    {Array(5).fill(null).map((_, i) => (
                      <a href="#" className="notify-item" key={i}>
                        <div className="notify-thumb"><i className="ti-key btn-danger"></i></div>
                        <div className="notify-text">
                          <p>You have Changed Your Password</p>
                          <span>Just Now</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="settings-btn">
                <i className="ti-settings"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Page Title Area */}
      <div className="page-title-area">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <div className="breadcrumbs-area clearfix">
              <h4 className="page-title pull-left">{pageName}</h4>
              <ul className="breadcrumbs pull-left">
                <li><Link href="/">Home</Link></li>
                <li><span>{moduleName}</span></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 clearfix">
            <div className="user-profile pull-right">
              <Image className="avatar user-thumb" src="/assets/images/author/avatar.png" alt="avatar" width={40} height={40} />
              <h4 className="user-name dropdown-toggle" data-toggle="dropdown">
                {userName || "Tobi Mark"} <i className="fa fa-angle-down"></i>
              </h4>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Message</a>
                <a className="dropdown-item" href="#">Settings</a>
                <a className="dropdown-item" href="#">Log Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
