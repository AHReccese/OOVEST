import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #1A2A38;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 3);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 15px;
  text-decoration: none !important;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #67D7CB;
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    color: #67D7CB;
  }
`;

export const Bars = styled.div`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: initial;
    /*position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;*/
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 5px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
  text-decoration: none !important;

`;

export const NavBtnLink = styled(Link)`
  text-decoration: none !important;
  border-radius: 4px;
  background: #006581;
  padding: 10px 22px;
  font-size: 14px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-right: 5px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #67D7CB;
    color: #010606;
  }
`;

export const PairedButtonBox = styled.div`
display: flex;
align-items: center;
margin-left: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
  display: none;
}
`;