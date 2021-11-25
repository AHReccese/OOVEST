import React from 'react';
import { Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import Baner1 from '../components/Home/Baner1';
import Baner2 from '../components/Home/Baner2';
import Baner3 from '../components/Home/Baner3';
import Baner4 from '../components/Home/Baner4';
import CoinTable from '../components/Home/CoinTable';
import BigTopImage from '../images/oovest_big_top.png'

const Home = () => {
  return (
    <>
      <Image src={BigTopImage} style={{width: '100%'}}/>
      <CoinTable/>
      <Baner1/>
      <Baner2/>
      <Baner3/>
      <Baner4/>
      <Footer/>
    </>
  );
};

export default Home;