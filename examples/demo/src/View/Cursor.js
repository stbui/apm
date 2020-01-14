import React from 'react';

export default ({ positon }) => {
    return <div className="cursor" style={{ left: positon.left + 'px', top: positon.top + 'px' }}></div>;
};
