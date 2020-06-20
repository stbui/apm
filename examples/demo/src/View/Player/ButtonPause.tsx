import React from 'react';
import Button from './Button';

export const ButtonPause = props => {
    return (
        <Button className="player-controls-button" {...props}>
            <svg
                width="14"
                height="16"
                viewBox="0 0 10 14"
                xmlns="http://www.w3.org/2000/svg"
                class="player-controls-icon ng-scope"
            >
                <defs>
                    <rect id="a" width="4" height="14" rx="2"></rect>
                    <rect id="b" x="6" width="4" height="14" rx="2"></rect>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <use fill="#D5D6D8"></use>
                    <rect stroke="#D5D6D8" x=".5" y=".5" width="3" height="13" rx="1.5"></rect>
                    <use fill="#D5D6D8"></use>
                    <rect stroke="#D5D6D8" x="6.5" y=".5" width="3" height="13" rx="1.5"></rect>
                </g>
            </svg>
        </Button>
    );
};

export default ButtonPause;
