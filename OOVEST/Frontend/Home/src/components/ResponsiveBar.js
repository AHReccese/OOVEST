import React from 'react';
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar"
import styled from 'styled-components';

export const ShowInSmall = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: initial;
  }
`;

export const ShowInBig = styled.div`
    display: none;
    @media screen and (min-width: 768px) {
        display: initial;
    }
`;

const ResponsiveBar = () => {

    return (
        <>
            <ShowInSmall>
                <Sidebar/>
            </ShowInSmall>
            <ShowInBig>
                <Navbar/>
            </ShowInBig>   
        </>
    );
};


export default ResponsiveBar;