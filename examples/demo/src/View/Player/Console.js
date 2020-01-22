import React, { useState, useRef, useEffect } from 'react';

const Console = ({ openConsole, closeConsole, isExpanded, addNewLogs, updateConsole, onSelectedLog }) => {
    return (
        <svg width="14" height="16" viewBox="0 0 10 14" className="player-controls-icon">
            <defs>
                <rect id="a" width="4" height="14" rx="2" />
                <rect id="b" x="6" width="4" height="14" rx="2" />
            </defs>
            <g fill="none" fill-rule="evenodd">
                <use fill="#D5D6D8" />
                <rect stroke="#D5D6D8" x=".5" y=".5" width="3" height="13" rx="1.5" />
                <use fill="#D5D6D8" />
                <rect stroke="#D5D6D8" x="6.5" y=".5" width="3" height="13" rx="1.5" />
            </g>
        </svg>
    );
};

export default Console;
