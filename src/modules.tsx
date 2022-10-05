import React from 'react'
import { HomePage, Page } from './interfaces/modules'
import {
    HomeOutlined,
    AddLocationOutlined,
} from '@material-ui/icons'

export const homePage: HomePage = {
    key: 'HomePage',
    name: 'Home',
    link: '',
    icon: <HomeOutlined />,
}

export const pages: Page[] = [
    // {
    //     key: 'play',
    //     name: 'Play',
    //     link: 'play',
    //     icon: <AddLocationOutlined />,
    // },
    {
        key: 'AddGamePage',
        name: 'Add A Game',
        link: 'add',
        icon: <AddLocationOutlined />,
    },
    {
        key: 'GameManagementPage',
        name: 'My Games',
        link: 'games',
        icon: <AddLocationOutlined />,
    },
]