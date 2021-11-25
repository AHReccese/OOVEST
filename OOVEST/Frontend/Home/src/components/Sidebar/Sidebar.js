import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons/lib';
import {
  Nav,
  NavLink,
} from '../Navbar/NavbarElements';
import logo from "../../images/oovest_logo_75.png"
import SidebarTokenLinker from './SidebarTokenLinker';
import { NavIcon, NavIconClose, SidebarLabel, SidebarLink, SidebarNav, SidebarWrap } from './Elements';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>

          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>

          <NavLink to='/'>
            <img src={logo} alt="Logo" />
          </NavLink>

        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIconClose to='#'>
              <FaIcons.FaRegTimesCircle onClick={showSidebar} />
            </NavIconClose>
            {SidebarData.map((item, index) => {
              return (
                <>
                  <SidebarLink to={item.path} onClick = {showSidebar}>
                  <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                  </div>
                  </SidebarLink>
                </>
              );
            })}
            <SidebarTokenLinker/>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;