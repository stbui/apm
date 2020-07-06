import React from 'react';

const Widget = ({ children, type = 'vbox', ...other }) => {
    return (
        <div className={`widget ${type}`} {...other}>
            {children}
        </div>
    );
};

const HBox = ({ children, ...other }) => (
    <Widget type="hbox" {...other}>
        {children}
    </Widget>
);

const VBox = ({ children, ...other }) => (
    <Widget type="VBox" {...other}>
        {children}
    </Widget>
);

export default Widget;
