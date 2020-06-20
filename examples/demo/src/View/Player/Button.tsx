import React from 'react';

const Button = ({ className, onClick, children, disabled, show = true }) => {
    return (
        <button
            className={`button ` + className}
            disabled={disabled}
            onClick={onClick}
            style={{ display: show ? '' : 'none' }}
        >
            {children}
        </button>
    );
};

export default Button;
