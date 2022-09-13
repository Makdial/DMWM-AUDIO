import React, { useState }  from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { FaCrown } from "react-icons/fa";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { useStateValue } from '../context/StateProvider';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';

import { motion } from 'framer-motion';

const Header = () => {

  const [{user}, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const navigate = useNavigate()

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then(() => {
      window.localStorage.setItem("auth", "false");
    }).catch((e) => console.log(e));
    navigate("/login", {replace : true})
  }

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <NavLink to="/">
            <img src={Logo} className="w-16" alt="Logo" />
        </NavLink>
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        {/* prettier-ignore */}
        <li className="mx-5 text-lg"><NavLink to={'/home'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Accueil</NavLink></li>
        {/* prettier-ignore */}
        <li className="mx-5 text-lg"><NavLink to={'/gamou'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Gamou</NavLink></li>
        {/* prettier-ignore */}
        <li className="mx-5 text-lg"><NavLink to={'/eveil'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Eveil</NavLink></li>
        {/* prettier-ignore */}
        <li className="mx-5 text-lg"><NavLink to={'/contact'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Contact</NavLink></li>
      </ul>

      <div
          onMouseEnter={() => setIsMenu(true)}
          onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative">
          <img
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          src={user?.user.imageURL}
          alt=""
          referrerpolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
          {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member.{" "}
            <FaCrown className="text-xm -ml-1 text-yellow-500" />{" "}
          </p>
        </div>

        {isMenu && (
          <motion.div 
          initial={{opacity : 0, y : 50}}
          animate = {{opacity : 1, y : 0}}
          exit = {{opacity : 0, y : 50}}
          className='absolute z-10 top-12 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'>
              <NavLink to={'/userProfile'}>
                  <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>
              </NavLink>
              <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Mes Favories</p>
              <hr />

              {
                user?.user?.role === "admin" && (
                    <>
                      <NavLink to={"/dashboard/home"}>
                        <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Tableau de bord</p>
                      </NavLink>
                      <hr />
                    </>
                )
              }

              <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out' onClick={logOut}>Deconnecter</p>
          </motion.div>
        )}

      </div>
    </header>
  )
}

export default Header