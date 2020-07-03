import React from 'react';

const Widget = ({ children, type = 'vbox' }) => {
    return <div className={`widget ${type}`}>{children}</div>;
};

export default Widget;
