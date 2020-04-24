import React, { useRef, useEffect, useState, useReducer } from 'react';
import { Widget, TabbedPane, Toolbar } from '../components';
// import { activities } from './activities.json';
import Player from './Player';

import './index.scss';

import mock from './Player/mock';
const activities = mock.activities;

let e = 0;
export default () => {
    // return <Player />;

    const [a, b] = useState();
    const [aa, aaa] = useState(1);

    const c = () => {
        let dd = 1;
        setInterval(() => {
            dd++;
            e = 0;
            aaa(dd);
        }, 500);
    };

    useEffect(() => {
        if (e < 10 && aa !== 1) {
            b(e++);
        }
    }, [e, aa]);

    console.log(e);

    return <button onClick={c}>ssssss{e}</button>;
};
