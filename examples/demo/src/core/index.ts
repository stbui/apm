import { h, Fragment } from './h';
import { render, scheduleWork } from './reconciler';
import { useState, useReducer, useEffect, useMemo, useCallback, useRef, useLayout } from './hooks';

export {
    h,
    h as createElement,
    Fragment,
    render,
    scheduleWork,
    useState,
    useReducer,
    useEffect,
    useMemo,
    useCallback,
    useRef,
    useLayout,
    useLayout as useLayoutEffect,
};

const Stb = {
    createElement: h,
    Fragment,
    render,
    scheduleWork,
    useState,
    useReducer,
    useEffect,
    useMemo,
    useCallback,
    useRef,
};

export default Stb;
