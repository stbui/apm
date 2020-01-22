import React, { useState, useRef, useEffect } from 'react';
import './Controls.scss';

const Button = ({ className, onClick, children, show = true }) => {
    return (
        <button className={`button ` + className} onClick={onClick} style={{ display: show ? '' : 'none' }}>
            {children}
        </button>
    );
};

const Controls = ({ children }) => {
    const [state, setState] = useState({
        hasFinished: false,
        isStreamingLive: false,
        isPlaying: false,
        arePlayerButtonsEnabled: false,
        isLive: false,
        sessionWasInitiallyLive: false,
    });

    const togglePlaying = () => {
        setState(oldState => ({ ...oldState, isPlaying: !state.isPlaying }));
    };
    const repeat = () => {};
    const selectNextStep = () => {};
    const goLive = () => {};

    return (
        <div className="player-controls-container player-controls" style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
                className="player-controls-button"
                onClick={togglePlaying}
                disabled={!state.arePlayerButtonsEnabled}
                show={!state.hasFinished || state.isStreamingLive}
            >
                {state.isPlaying || state.isStreamingLive ? (
                    <span className="icon-pause"></span>
                ) : (
                    <span className="icon-play"></span>
                )}
            </Button>
            <Button
                show={state.hasFinished && !state.isStreamingLive}
                className="player-controls-button"
                onClick={repeat}
            >
                <span className="icon-repeat"></span>
            </Button>
            <Button
                disabled={!state.arePlayerButtonsEnabled}
                className="player-controls-button"
                onClick={selectNextStep()}
            >
                <span className="icon-next"></span>
            </Button>

            <Button
                className={`player-controls-button watch-live ${!state.isLive ? 'is-offline' : 'green'} `}
                onClick={goLive()}
                disabled={!state.isLive}
                show={state.sessionWasInitiallyLive && !state.isStreamingLive}
            >
                <div layout="row" layout-align="center center">
                    <div flex>
                        {state.isLive ? (
                            <span ng-switch-when="true">
                                <span className="icon-live"></span>
                                转直播
                            </span>
                        ) : (
                            <span ng-switch-when="false">
                                <span className="icon-offline"></span>
                                已离线
                            </span>
                        )}
                    </div>
                </div>
            </Button>

            <Button
                className="player-controls-button watching-live"
                disabled
                show={state.sessionWasInitiallyLive && state.isStreamingLive}
            >
                <div layout="row" layout-align="center center" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div class="player-live-button-indicator live-red"></div>
                    <div flex>
                        <span className="icon-live-red"></span>
                        Live
                    </div>
                </div>
            </Button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
        </div>
    );
};

export default Controls;
