import React from 'react';
import Button from './Button';

export const ButtonNext = props => {
    return (
        <Button className="player-controls-button" {...props}>
            <svg
                width="18"
                height="19"
                fill="#D5D6D8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                class="player-controls-icon ng-scope"
            >
                <path d="M24 .455c-1.1 0-2 .9-2 2v8.4c-.1-.1-.2-.2-.4-.3l-12.9-8.9c-.7-.5-1.5-.7-2.4-.7-2.3 0-4.3 1.9-4.3 4.3v17.7c0 2.4 1.9 4.3 4.3 4.3.8 0 1.7-.3 2.4-.8l12.9-8.9c.1-.1.2-.2.4-.3v8.2c0 1.1.9 2 2 2s2-.9 2-2v-23c0-1.1-.9-2-2-2zm-4.6 13.9l-12.9 8.9h-.1s-.3 0-.3-.3v-17.7c0-.3.3-.3.3-.3h.1l12.9 8.9c.1.1.1.2.1.2s0 .2-.1.3z"></path>
            </svg>
        </Button>
    );
};

export default ButtonNext;
