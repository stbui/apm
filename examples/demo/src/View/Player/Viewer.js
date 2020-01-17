import React, { useState, useRef, useEffect } from 'react';

const Viewer = ({
    sessionScreenWidth,
    sessionScreenHeight,
    maxWidth,
    maxHeight,
    isCreated,
    renderingProgress,
    initialVisibilityState,
    showLoadingAnimation,
    sessionId,
    handleConsoleResize,
}) => {
    return (
        <div>
            <div className="viewer-wrapper"></div>
            <div id="viewer-container"></div>
            <iframe id="viewer" sandbox="allow-scripts allow-same-origin"></iframe>
        </div>
    );
};

export default Viewer;
