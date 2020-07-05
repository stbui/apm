import React from 'react';

const Widget = ({ children, type = 'vbox', ...other }) => {
    return (
        <div className={`widget ${type}`} {...other}>
            {children}
        </div>
    );
};

export default Widget;
