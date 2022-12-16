import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFileSync } from 'fs';

import { AccountControl, ProjectsControl, SessionControl, Config } from './database';
import { ReceiveBuffer } from './ReceiveBuffer';
import { UserAgent } from './UserAgent';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8888;

const config = new Config();
config.storePath = './src/api';

// =============================================================
app.get('/:projectId/sessions/:sessionId', async (req, res) => {
    const sessionControl = new SessionControl();
    const json = await sessionControl.getSessionById(req.params.sessionId);
    res.send(json);
});

app.get('/:projectId/sessions/:sessionId/notes', (req, res) => {
    res.send({ data: [] });
});

app.get('/:projectId/sessions/:sessionId/dom.mobs', (req, res) => {
    const path = `${config.storePath}/${req.params.projectId}/sessions/${req.params.sessionId}/dom.mobs.json`;
    const buff = readFileSync(path);
    console.log('[]: 读取数据文件', path);
    res.send(buff);
});

// app.get('/:projectId/sessions/:sessionId/devtools.mob', (req, res) => {
// const path = `./src/api/${req.params.projectId}/sessions/${req.params.sessionId}/dom.mobs.json`;
// const buff = readFileSync(path);
// res.send(buff);
// });

app.get('/account', (req, res) => {
    const accountControl = new AccountControl();
    res.send(accountControl);
});
app.get('/projects', (req, res) => {
    const projectsControl = new ProjectsControl();
    res.send(projectsControl);
});
app.get('/integrations/slack/channels', (req, res) => {
    res.send({ data: [] });
});
app.get('/integrations/issues', (req, res) => {
    res.send({ data: [] });
});
app.get('/client/members', (req, res) => {
    res.send({
        data: [
            {
                userId: 4339,
                email: 'w431106@gmail.com',
                role: 'owner',
                name: 'demo',
                createdAt: 1642510038638,
                superAdmin: true,
                admin: false,
                member: false,
                expiredInvitation: true,
                joined: true,
                invitationToken: null,
                roleId: 9775,
                roleName: 'Owner',
                invitationLink: null,
            },
        ],
    });
});

app.get('/boarding', (req, res) => {
    res.send({
        data: [
            { task: 'Install OpenReplay', done: true, URL: 'https://docs.openreplay.com/getting-started/quick-start' },
            { task: 'Identify Users', done: false, URL: 'https://docs.openreplay.com/data-privacy-security/metadata' },
            { task: 'Invite Team Members', done: false, URL: 'https://app.openreplay.com/client/manage-users' },
            { task: 'Integrations', done: false, URL: 'https://docs.openreplay.com/integrations' },
        ],
    });
});

app.get('/limits', (req, res) => {
    res.send({ data: { teamMember: -1, projects: -1 } });
});
app.get('/notifications/count', (req, res) => {
    res.send({ data: [] });
});
app.get('/notifications', (req, res) => {
    res.send({ data: [] });
});
app.get('/:projectId/saved_search', (req, res) => {
    res.send({ data: [] });
});

app.get('/:projectId/metadata', (req, res) => {
    res.send({ data: [] });
});
app.post('/:projectId/sessions/search', async (req, res) => {
    const sessionControl = new SessionControl();
    const sessions = await sessionControl.searchSessions(req.params.projectId, 1);

    res.send({
        data: {
            total: 10,
            sessions: sessions,
        },
    });
});
// =============================================================

// =============================================================

const receiveBuffer = new ReceiveBuffer(config);

app.post('/v1/web/start', (req, res) => {
    const sessionControl = new SessionControl();

    let tokenData: any = {};
    const userUUID = req.body.userUUID;
    const reset = req.body.reset;
    // 当前时间
    const timestamp = req.body.timestamp;

    const projectsControl = new ProjectsControl();
    const p = projectsControl.findOne(req.body.projectKey);
    const projectID = p.projectId;

    // 如果token不存在 或者 是reset
    if (!req.body.token || reset) {
        const now = new Date().getTime();
        // 生成id, 时间戳+64数据
        const sessionId = now;
        tokenData = {
            id: sessionId,
            // 客户端与服务端时间延迟
            delay: now - timestamp,
            // MaxSessionDuration
            expTime: new Date().getTime() * 100000,
        };

        const ua = req.headers['user-agent'];
        const uu = new UserAgent();
        const userAgent = uu.parse(ua);

        const sessionStart = {
            Timestamp: timestamp || now,
            ProjectID: projectID,
            TrackerVersion: req.body.trackerVersion,
            RevID: req.body.revID,
            UserUUID: userUUID,
            UserAgent: ua,
            UserOS: userAgent.os,
            UserOSVersion: userAgent.userOsVersion,
            UserBrowser: userAgent.browser,
            UserBrowserVersion: uu.getBrowserVersion(ua),
            UserDevice: '',
            UserDeviceType: '',
            UserCountry: 'TW',
            UserDeviceMemorySize: req.body.deviceMemory,
            UserDeviceHeapSize: req.body.jsHeapSizeLimit,
            UserID: req.body.UserID,
        };
        // save
        sessionControl.insertWebSessionStart(sessionId, sessionStart);
        receiveBuffer.start(projectID, sessionId);
    } else {
        tokenData = JSON.parse(req.body.token);
        receiveBuffer.start(projectID, tokenData.id);
    }

    // 加密token数据
    const token = JSON.stringify(tokenData);
    res.send({
        timestamp: 0,
        delay: tokenData.delay,
        token: token,
        startTimestamp: parseInt(tokenData.id),
        userUUID: userUUID,
        sessionID: String(tokenData.id),
        projectID: projectID,
        beaconSizeLimit: 10000000,
    });
});
app.post('/v1/web/i', (req, res) => {
    // Authorization Bearer
    const sessionData = {
        ID: '',
    };

    req.on('data', chunk => {
        console.log(`可用的数据块: ${chunk.length}`);
        receiveBuffer.insert(chunk);
    });

    res.send();
});
// =============================================================

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
