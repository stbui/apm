import React, { useState, useRef, useEffect } from 'react';
import './Controls.scss';

const Button = ({ className, children }) => {
    return <button className={`button ` + className}>{children}</button>;
};

const Controls = ({ children }) => {
    return (
        <div className="player-controls-container player-controls _md layout-row">
            <Button
                ng-show="!hasFinished || isStreamingLive"
                md-no-ink
                ng-disabled="!arePlayerButtonsEnabled"
                className="player-controls-button"
                ng-click="togglePlaying()"
                aria-label="Toggle play/pause"
                ng-switch="(isPlaying || isStreamingLive)"
            >
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

                <svg width="14" height="16" viewBox="0 0 14 16" className="player-controls-icon">
                    <path
                        d="M12.822 6.267L3.056.301A2.014 2.014 0 0 0 1.024.25 1.902 1.902 0 0 0 0 1.95v11.933c0 .717.393 1.35 1.024 1.7a2.012 2.012 0 0 0 2.032-.05l9.766-5.967c.58-.366.939-.983.939-1.65 0-.683-.341-1.3-.939-1.65z"
                        fill="#D5D6D8"
                        fill-rule="nonzero"
                    />
                </svg>
            </Button>
            <Button
                ng-show="hasFinished && !isStreamingLive"
                md-no-ink
                className="player-controls-button"
                ng-click="repeat()"
                aria-label="Repeat"
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <defs></defs>
                    <g id="Icons" stroke="none" stroke-width="1" fill="#D5D6D8" fill-rule="evenodd">
                        <g id="Refresh" fill="#D5D6D8" stroke="#D5D6D8">
                            <g id="ref" transform="translate(3.000000, 4.000000)">
                                <path
                                    d="M17.1818182,7.36363636 L15.9545455,7.36363636 C15.7090909,3.27272727 12.3545455,0 8.18181818,0 C3.92727273,0 0.409090909,3.51818182 0.409090909,7.77272727 C0.409090909,12.0272727 3.92727273,15.5454545 8.18181818,15.5454545 C9.81818182,15.5454545 11.4545455,15.0545455 12.7636364,14.0727273 C13.0909091,13.8272727 13.1727273,13.2545455 12.9272727,12.9272727 C12.6818182,12.6 12.1090909,12.5181818 11.7818182,12.7636364 C10.7181818,13.5 9.49090909,13.9090909 8.18181818,13.9090909 C4.82727273,13.9090909 2.04545455,11.1272727 2.04545455,7.77272727 C2.04545455,4.41818182 4.82727273,1.63636364 8.18181818,1.63636364 C11.4545455,1.63636364 14.0727273,4.17272727 14.3181818,7.36363636 L13.0909091,7.36363636 C12.6818182,7.36363636 12.5181818,7.60909091 12.8454545,7.93636364 L14.6454545,9.9 C14.9727273,10.2272727 15.4636364,10.2272727 15.7090909,9.9 L17.5090909,7.93636364 C17.7545455,7.60909091 17.5909091,7.36363636 17.1818182,7.36363636 Z"
                                    id="Shape"
                                ></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </Button>
            <Button
                md-no-ink
                ng-disabled="!arePlayerButtonsEnabled"
                className="player-controls-button"
                ng-click="selectNextStep()"
                aria-label="Next step"
            >
                {/* <md-tooltip md-direction="top">下一步</md-tooltip> */}
                <svg
                    width="18"
                    height="19"
                    fill="#D5D6D8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    class="player-controls-icon"
                >
                    <path d="M24 .455c-1.1 0-2 .9-2 2v8.4c-.1-.1-.2-.2-.4-.3l-12.9-8.9c-.7-.5-1.5-.7-2.4-.7-2.3 0-4.3 1.9-4.3 4.3v17.7c0 2.4 1.9 4.3 4.3 4.3.8 0 1.7-.3 2.4-.8l12.9-8.9c.1-.1.2-.2.4-.3v8.2c0 1.1.9 2 2 2s2-.9 2-2v-23c0-1.1-.9-2-2-2zm-4.6 13.9l-12.9 8.9h-.1s-.3 0-.3-.3v-17.7c0-.3.3-.3.3-.3h.1l12.9 8.9c.1.1.1.2.1.2s0 .2-.1.3z" />
                </svg>
            </Button>

            <Button
                className="player-controls-button watch-live"
                md-no-ink
                ng-class="{'is-offline': !isLive, 'green': isLive}"
                ng-click="goLive()"
                aria-label="Watch Live"
                ng-disabled="!isLive"
                ng-show="sessionWasInitiallyLive && !isStreamingLive"
            >
                <div layout="row" layout-align="center center">
                    <div flex ng-switch="isLive">
                        <span ng-switch-when="true">
                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <g fill="#1BB36F" fill-rule="nonzero">
                                    <path
                                        d="M1.229 10.48l-.007-.02a.38.38 0 0 0-.714.259l.008.021a.38.38 0 0 0 .713-.26zM1.762 11.615l-.01-.017a.38.38 0 0 0-.657.379l.01.02a.38.38 0 0 0 .657-.382zM2.485 12.642l-.014-.015a.38.38 0 1 0-.581.487l.014.018a.38.38 0 1 0 .58-.49zM4.404 14.25l-.018-.01a.38.38 0 0 0-.38.655l.02.012a.38.38 0 0 0 .378-.658zM.902 9.267L.9 9.247a.38.38 0 0 0-.748.13l.004.022a.38.38 0 0 0 .747-.132zM3.375 13.53l-.016-.014a.379.379 0 1 0-.489.58l.018.015a.38.38 0 0 0 .487-.582zM.732 5.778a.38.38 0 0 0 .486-.227l.007-.02a.38.38 0 0 0-.713-.26l-.007.021a.38.38 0 0 0 .227.486zM1.229 4.55a.38.38 0 0 0 .518-.139l.01-.018a.38.38 0 0 0-.656-.38l-.012.02a.38.38 0 0 0 .14.518zM.458 7.073a.38.38 0 0 0 .439-.31l.003-.02a.38.38 0 1 0-.747-.13l-.004.022a.38.38 0 0 0 .31.438zM.791 8.016v-.021a.38.38 0 0 0-.758 0V8.017a.38.38 0 1 0 .758-.001zM12.636 13.52l-.015.013a.38.38 0 1 0 .487.583l.017-.015a.38.38 0 1 0-.489-.58zM10.472 14.774l-.02.007a.38.38 0 0 0 .259.714l.02-.008a.38.38 0 0 0-.259-.713zM11.609 14.242l-.018.01a.38.38 0 1 0 .378.658l.02-.011a.38.38 0 1 0-.38-.657zM9.26 15.1l-.021.003a.38.38 0 1 0 .13.747l.022-.003a.38.38 0 0 0-.132-.748zM2.466 3.38l.013-.015a.38.38 0 0 0-.58-.488l-.015.017a.38.38 0 0 0 .582.487zM6.756 15.102l-.02-.004a.38.38 0 1 0-.132.748l.022.003a.38.38 0 1 0 .13-.747zM5.543 14.78l-.02-.008a.38.38 0 1 0-.26.713l.022.007a.38.38 0 1 0 .258-.713zM13.524 12.631l-.013.016a.38.38 0 0 0 .58.49l.014-.018a.38.38 0 1 0-.58-.488zM8.008 15.209H7.987a.38.38 0 0 0-.001.758h.023a.38.38 0 0 0-.001-.758zM12.613 2.46l.016.014a.38.38 0 0 0 .488-.581l-.018-.015a.38.38 0 1 0-.486.583zM15.54 8.943a.38.38 0 0 0-.44.309l-.003.02a.38.38 0 0 0 .747.133l.004-.022a.38.38 0 0 0-.308-.44zM15.095 6.718l.004.02a.38.38 0 0 0 .747-.132l-.004-.023a.38.38 0 1 0-.747.135zM13.505 3.346l.014.015a.38.38 0 0 0 .58-.488l-.015-.018a.38.38 0 1 0-.579.49zM14.766 5.506l.007.02a.38.38 0 0 0 .713-.26l-.008-.022a.38.38 0 0 0-.712.262zM15.967 7.988v-.023a.38.38 0 0 0-.758.004V8.02a.38.38 0 0 0 .759.003V8l-.001-.006v-.006zM14.23 4.371l.01.018a.38.38 0 1 0 .657-.38l-.011-.02a.38.38 0 1 0-.656.382zM15.263 10.238a.38.38 0 0 0-.486.226l-.008.02a.38.38 0 1 0 .713.261l.008-.021a.38.38 0 0 0-.227-.486zM11.582 1.743l.018.01a.38.38 0 1 0 .38-.657l-.02-.011a.38.38 0 0 0-.378.658zM6.725.904L6.745.9a.38.38 0 1 0-.13-.747l-.023.004a.38.38 0 1 0 .133.747zM4.378 1.766l.018-.01a.38.38 0 1 0-.38-.657l-.02.011a.38.38 0 0 0 .382.656zM14.764 11.464a.379.379 0 0 0-.518.139l-.01.017a.38.38 0 1 0 .655.382l.012-.02a.38.38 0 0 0-.14-.518zM3.352 2.49l.015-.014a.38.38 0 1 0-.488-.58l-.017.014a.38.38 0 1 0 .49.58zM5.513 1.231l.02-.007a.38.38 0 1 0-.26-.713L5.252.52a.38.38 0 1 0 .261.712zM10.442 1.215l.02.008a.38.38 0 0 0 .26-.714L10.7.502a.38.38 0 0 0-.258.713zM7.977.791h.02a.38.38 0 0 0 0-.758h-.023a.38.38 0 1 0 .003.758zM9.228.895l.02.004A.38.38 0 0 0 9.38.152L9.357.148a.38.38 0 1 0-.129.747z"
                                        opacity=".2"
                                    />
                                    <path
                                        d="M8 2.408a5.592 5.592 0 1 0 0 11.184A5.592 5.592 0 0 0 8 2.408zm3.34 8.933A4.708 4.708 0 0 1 8 12.725a4.71 4.71 0 0 1-3.341-1.384 4.708 4.708 0 0 1-1.384-3.34 4.71 4.71 0 0 1 1.384-3.342A4.708 4.708 0 0 1 8 3.275c1.306 0 2.484.529 3.34 1.384A4.708 4.708 0 0 1 12.726 8a4.709 4.709 0 0 1-1.384 3.341z"
                                        opacity=".5"
                                    />
                                    <path d="M8 5.41a2.591 2.591 0 1 0 0 5.181A2.591 2.591 0 0 0 8 5.41z" />
                                </g>
                            </svg>
                            转直播
                        </span>
                        <span ng-switch-when="false">
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5.41a2.591 2.591 0 1 0 0 5.181A2.591 2.591 0 0 0 8 5.41z" fill="#2e3440" />
                            </svg>
                            已离线
                        </span>
                    </div>
                </div>
            </Button>

            <Button
                className="player-controls-button watching-live"
                md-no-ink
                aria-label="Live"
                disabled
                ng-show="sessionWasInitiallyLive && isStreamingLive"
            >
                <div layout="row" layout-align="center center">
                    <div class="player-live-button-indicator live-red"></div>
                    <div flex>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#F2453D" fill-rule="nonzero">
                                <path d="M8 5.41a2.591 2.591 0 1 0 0 5.181A2.591 2.591 0 0 0 8 5.41z" />
                                <path
                                    d="M8 3.205a4.796 4.796 0 1 0 .001 9.591A4.796 4.796 0 0 0 8 3.205z"
                                    opacity=".5"
                                />
                                <path d="M8 .602A7.398 7.398 0 1 0 8.001 15.4 7.398 7.398 0 0 0 8 .602z" opacity=".2" />
                            </g>
                        </svg>
                        Live
                    </div>
                </div>
            </Button>
            {children}
        </div>
    );
};

export default Controls;
