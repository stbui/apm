import React, { useState } from 'react';
import './Controls.scss';

import Button from './Button';
import ButtonNext from './ButtonNext';
import ButtonRepeat from './ButtonRepeat';
import ButtonPlay from './ButtonPlay';
import ButtonPause from './ButtonPause';

const Controls = ({
    children,
    hasFinished,
    isStreamingLive,
    isPlaying,
    arePlayerButtonsEnabled,
    isLive,
    sessionWasInitiallyLive,
    onTogglePlaying,
    onRepeat,
    onSelectNextStep,
    onLive,
}) => {
    const [state, setState] = useState({
        hasFinished: false,
        isStreamingLive: false,
        isPlaying: false,
        arePlayerButtonsEnabled: true,
        isLive: false,
        sessionWasInitiallyLive: false,
    });

    const togglePlaying = () => {
        setState(oldState => ({ ...oldState, isPlaying: !state.isPlaying }));
        onTogglePlaying && onTogglePlaying(!state.isPlaying);
    };

    const repeat = () => {
        onRepeat && onRepeat();
    };
    const selectNextStep = () => {
        onSelectNextStep && onSelectNextStep();
    };
    const goLive = () => {
        onLive && onLive();
    };

    return (
        <div className="player-controls-container player-controls" style={{ display: 'flex', flexDirection: 'row' }}>
            {isPlaying || isStreamingLive ? (
                <ButtonPause
                    disabled={!arePlayerButtonsEnabled}
                    show={!hasFinished || isStreamingLive}
                    onClick={togglePlaying}
                />
            ) : (
                <ButtonPlay
                    disabled={!arePlayerButtonsEnabled}
                    show={!hasFinished || isStreamingLive}
                    onClick={togglePlaying}
                />
            )}

            <ButtonRepeat show={hasFinished && !isStreamingLive} onClick={repeat} />
            <ButtonNext disabled={!arePlayerButtonsEnabled} onClick={selectNextStep} />

            <Button
                className={`player-controls-button watch-live ${!isLive ? 'is-offline' : 'green'} `}
                onClick={goLive()}
                disabled={!isLive}
                show={sessionWasInitiallyLive && !isStreamingLive}
            >
                <div layout="row" layout-align="center center">
                    <div flex>
                        {isLive ? (
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
                show={sessionWasInitiallyLive && isStreamingLive}
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
