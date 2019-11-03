import React from 'react';
import { Prophet, Resource } from '@stbui/prophet';
import { Layout, CatchAll } from '@stbui/prophet-antd';
import dataProvider from './dataProvider';
import Dashboard from './dashboard';
import users from './setting/users';
import pageAnalyze from './pageAnalyze';
import settingSite from './setting/site';

import './App.scss';


export default () => (
    <Prophet
        dataProvider={dataProvider}
        dashboard={Dashboard}
        layout={Layout}
        login={CatchAll}
        catchAll={() => <CatchAll auth={403} />}
    >
        <Resource name="operateAnalyze" label="实时统计" {...settingSite} />
        <Resource name="totalAnalyze" label="整体趋势" {...settingSite} />
        <Resource name="pageAnalyze" label="页面分析" {...pageAnalyze} />
        <Resource name="useBehavior" label="网页圈选" {...settingSite} />
        <Resource name="eventAnalysis" label="事件分析" {...settingSite} />
        <Resource name="siteSetting" label="用户分析" {...settingSite} />
        <Resource name="siteSetting" label="转化分析" {...settingSite} />
        <Resource name="userRetain" label="活跃用户留存" {...settingSite} />
        <Resource name="siteSetting" label="渠道分析" {...settingSite} />
        <Resource name="setting/site" label="站点配置" {...settingSite} />
        <Resource name="user" label="用户设置" {...users} />
    </Prophet>
);
