import React, { useRef, useEffect, useState, useReducer } from 'react';
import { Widget, TabbedPane, Toolbar } from '../components';
// import { activities } from './activities.json';
import Player from './Player';

import './index.scss';

import mock from './Player/mock';
const activities = mock.activities;

let e = 0;
export default () => {
    return <Player />;

    // const [a, b] = useState();
    // const [aa, bb] = useState(false);

    // const c = () => {
    //     bb(true);
    // };

    // useEffect(() => {
    //     console.log(e);
    //     if (e < 10 && aa) {
    //         b(e++);
    //     }
    // }, [e, aa]);

    // return <button onClick={c}>ssssss{a}</button>;
};
