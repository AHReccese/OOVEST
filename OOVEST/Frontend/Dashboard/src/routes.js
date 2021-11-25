import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;


const Dashboard = React.lazy(() => import('./Main/Home/Dashboard'));
const News = React.lazy(() => import('./Main/Home/News'));

const ExchangesNobitex = React.lazy(() => import('./Main/Exchanges/nobitex'));

const MainMarketsBitcoin = React.lazy(() => import('./Main/MainMarkets/bitcoin'));
const MainMarketsEthereum = React.lazy(() => import('./Main/MainMarkets/ethereum'));

const Bitcoinsignalbot = React.lazy(() => import('./Main/Tools/Robots/SignalBot/bitcoin'));
const Ethereumsignalbot = React.lazy(() => import('./Main/Tools/Robots/SignalBot/ethereum'));
const BotProfitTest = React.lazy(() => import('./Main/Tools/Robots/ProfitTest/RobotProfitTestLayout'));
const CoinChart = React.lazy(() => import('./Main/Tools/CoinChart/CoinChartLayout'));

const Profile = React.lazy(() => import('./Main/Profile/Profile'));
const SignOut = React.lazy(() => import('./Main/Staticpages/SignOut'));

const routes = [
    { path: '/home/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/home/news', exact: true, name: 'News', component: News },

    { path: '/exchange/nobitex', exact: true, name: 'Nobitex', component: ExchangesNobitex },

    { path: '/mainmarkets/bitcoin', exact: true, name: 'Bitcoin', component: MainMarketsBitcoin },
    { path: '/mainmarkets/ethereum', exact: true, name: 'Ethereum', component: MainMarketsEthereum },

    { path: '/tools/robots/signalbot/bitcoin', exact: true, name: 'Bitcoinsignalbot', component: Bitcoinsignalbot },
    { path: '/tools/robots/signalbot/ethereum', exact: true, name: 'Ethereumsignalbot', component: Ethereumsignalbot },
    { path: '/tools/robots/botprofittest', exact: true, name: 'BotProfitTest', component: BotProfitTest },
    { path: '/tools/coincharts', exact: true, name: 'CoinChart', component: CoinChart},

    { path: '/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/signout', exact: true, name: 'Signout', component: SignOut },

];

export default routes;