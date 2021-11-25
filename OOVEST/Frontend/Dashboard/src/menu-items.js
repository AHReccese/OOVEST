import {homeURL} from '../src/IPAddresses/IPaddresses'
export default {
    items: [
        {
            id: 'home',
            title: 'home',
            type: 'group',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/home/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'news',
                    title: 'News',
                    type: 'item',
                    url: '/home/news',
                    icon: 'feather icon-map',
                },
            ]
        },
        {
            id: 'exchanges',
            title: 'My Exchange',
            type: 'group',
            children: [
                {
                    id: 'nobitex',
                    title: 'Nobitex',
                    type: 'item',
                    url: '/exchange/nobitex',
                    icon: 'feather icon-briefcase',
                }
            ]
        },
        {
            id: 'markets',
            title: 'Markets',
            type: 'group',
            children: [
                {
                    id: 'mainmarkets',
                    title: 'Main Markets',
                    type: 'collapse',
                    icon: 'feather icon-activity',
                    children: [
                        {
                            id: 'button',
                            title: 'Bitcoin',
                            type: 'item',
                            icon: 'feather icon-bar-chart',
                            url: '/mainmarkets/bitcoin'
                        },
                        {
                            id: 'badges',
                            title: 'Ethereum',
                            type: 'item',
                            icon: 'feather icon-bar-chart',
                            url: '/mainmarkets/ethereum'
                        },
                    ]
                }
            ]
        },
        {
            id: 'traders',
            title: 'Tools',
            type: 'group',
            children: [
                {
                    id: 'robots',
                    title: 'Robots',
                    type: 'collapse',
                    icon: 'feather icon-sliders',
                    children: [
                        {
                            id: 'signalbots',
                            title: 'Signal Robots',
                            type: 'collapse',
                            icon: 'feather icon-radio',
                            children: [
                                {
                                    id: 'bitcoinsignalbot',
                                    title: 'Bitcoin',
                                    type: 'item',
                                    icon: 'feather icon-bar-chart',
                                    url: '/tools/robots/signalbot/bitcoin'
                                },
                                {
                                    id: 'ethereumsignalbot',
                                    title: 'Ethereum',
                                    type: 'item',
                                    icon: 'feather icon-bar-chart',
                                    url: '/tools/robots/signalbot/ethereum'
                                },
                            ]
                        },
                        {
                            id: 'botprofittest',
                            title: 'Robot Profit Test',
                            type: 'item',
                            icon: 'feather icon-loader',
                            url: '/tools/robots/botprofittest'
                        },
                    ]
                },
                {
                    id: 'coincharts',
                    title: 'Coin Price',
                    type: 'item',
                    icon: 'feather icon-search',
                    url: '/tools/coincharts'
                }
            ]
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'group',
            children: [
                {
                    id: 'profile',
                    title: 'Profile',
                    type: 'item',
                    url: '/profile',
                    icon: 'feather icon-user'
                },
                {
                    id: 'exit',
                    title: 'Sign Out',
                    type: 'item',
                    url: '/signout',
                    classes: 'nav-item disabled',
                    icon: 'feather icon-power'
                }
            ]
        }
    ]
}