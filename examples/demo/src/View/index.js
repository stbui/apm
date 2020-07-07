import React from 'react';
import Player from './Player';

import './index.scss';

const q = new URLSearchParams(window.location.search);
const sessionId = q.get('id') || '5ed51f8b33f0736bcdfd046a';

export default () => {
    return <Player sessionId={sessionId} />;
};
