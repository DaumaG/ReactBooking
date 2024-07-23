import React, { useState, useRef, useEffect, PropsWithChildren } from 'react';  
import styles from './Avatar.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../router/consts";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
  
const Avatar = ({ children }: PropsWithChildren<{}>) => {  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);  
  const avatarRef = useRef<HTMLDivElement>(null);  
 
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  
  const handleLogout = () => { 
    logout();  
    navigate(ROUTES.LOGIN);
  };  
  

  // Show the dropdown when hovering over the avatar  
  const handleMouseEnter = () => {  
    setIsDropdownVisible(true);  
  };  
  
  // Hide the dropdown when the mouse leaves the avatar or dropdown area  
  const handleMouseLeave = () => {  
    setIsDropdownVisible(false);  
  };  
  
  // Close the dropdown if clicking outside of it  
  useEffect(() => {  
    function handleOutsideClick(event: MouseEvent) {  
      if (avatarRef.current && event.target instanceof Node && !avatarRef.current.contains(event.target)) {  
        setIsDropdownVisible(false);  
      }  
    }  
  
    document.addEventListener('mousedown', handleOutsideClick);  
  
    return () => {  
      document.removeEventListener('mousedown', handleOutsideClick);  
    };  
  }, []);  
  
  return (  
    <div className={styles.avatarContainer} ref={avatarRef}>  
      <div  
        className={styles.avatar}  
        onMouseEnter={handleMouseEnter}  
        onMouseLeave={handleMouseLeave}  
      >  
        {children}  
      </div>  
      {isDropdownVisible && (  
        <div  
          className={styles.dropdown}  
          onMouseEnter={handleMouseEnter}  
          onMouseLeave={handleMouseLeave}  
        >  
          <ul>  
            <li><button onClick={handleLogout}>Logout</button></li>  
          </ul>  
        </div>  
      )}  
    </div>  
  );  
};  
  
export default Avatar;  
