import React from 'react';
import CoinPageLayout from './CoinPageLayout';

function Bitcoin() {
  return (
    <CoinPageLayout coin={'btc'} persianname={'بیت کوین'} englishname={'Bitcoin'} market={'BTCIRT'}/>
  );
};

export default Bitcoin;