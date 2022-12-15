import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFileSync } from 'fs';

import { AccountControl, ProjectsControl, SessionControl } from './database';
import { ReceiveBuffer } from './ReceiveBuffer';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8888;

// =============================================================
app.get('/:projectId/sessions/:sessionId', async (req, res) => {
    const sessionControl = new SessionControl();
    // console.log(req.params.sessionId);
    const json = await sessionControl.getSessionById(req.params.sessionId, req);
    res.send(json);
});

app.get('/:projectId/sessions/:sessionId/notes', (req, res) => {
    res.send({ data: [] });
});

app.get('/:projectId/sessions/:sessionId/dom.mobs', (req, res) => {
    const path = `./src/api/${req.params.projectId}/sessions/${req.params.sessionId}/dom.mobs.json`;
    const buff = readFileSync(path);
    res.send(buff);
});

// app.get('/:projectId/sessions/:sessionId/devtools.mob', (req, res) => {
// const path = `./src/api/${req.params.projectId}/sessions/${req.params.sessionId}/dom.mobs.json`;
// const buff = readFileSync(path);
// res.send(buff);
// });

app.get('/account', (req, res) => {
    const accountControl = new AccountControl();
    res.send(accountControl.toJSON());
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
app.post('/:projectId/sessions/search', (req, res) => {
    res.send({
        data: {
            total: 3,
            sessions: [
                {
                    projectId: 3296,
                    sessionId: '6062791290173460',
                    userUuid: 'cbe7af94-60a7-46ee-94a2-15e7232fb289',
                    userId: null,
                    userAgent:
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
                    userOs: 'Mac OS X',
                    userBrowser: 'Chrome',
                    userDevice: '',
                    userDeviceType: 'desktop',
                    userCountry: 'CN',
                    startTs: 1642510851772,
                    duration: 108114,
                    eventsCount: 1,
                    pagesCount: 1,
                    errorsCount: 0,
                    userAnonymousId: null,
                    platform: 'web',
                    issueScore: 1642510851,
                    issueTypes: [],
                    favorite: false,
                    viewed: true,
                },
                {
                    projectId: 3296,
                    sessionId: '6062770913379269',
                    userUuid: 'cbe7af94-60a7-46ee-94a2-15e7232fb289',
                    userId: null,
                    userAgent:
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
                    userOs: 'Mac OS X',
                    userBrowser: 'Chrome',
                    userDevice: '',
                    userDeviceType: 'desktop',
                    userCountry: 'CN',
                    startTs: 1642510540951,
                    duration: 47538,
                    eventsCount: 1,
                    pagesCount: 1,
                    errorsCount: 0,
                    userAnonymousId: null,
                    platform: 'web',
                    issueScore: 1642510540,
                    issueTypes: [],
                    favorite: false,
                    viewed: true,
                },
                {
                    projectId: 3296,
                    sessionId: '6062739610258400',
                    userUuid: 'cbe7af94-60a7-46ee-94a2-15e7232fb289',
                    userId: null,
                    userAgent:
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
                    userOs: 'Mac OS X',
                    userBrowser: 'Chrome',
                    userDevice: '',
                    userDeviceType: 'desktop',
                    userCountry: 'TW',
                    startTs: 1642510064170,
                    duration: 173766,
                    eventsCount: 1,
                    pagesCount: 1,
                    errorsCount: 0,
                    userAnonymousId: null,
                    platform: 'web',
                    issueScore: 1642510064,
                    issueTypes: [],
                    favorite: false,
                    viewed: true,
                },
            ],
        },
    });
});
// =============================================================

// =============================================================

const receiveBuffer = new ReceiveBuffer();
app.post('/v1/web/start', async (req, res) => {
    const sessionControl = new SessionControl();
    const session = await sessionControl.start(req.body);

    receiveBuffer.start(3296, session.sessionID);

    res.send(session);
});
app.post('/v1/web/i', (req, res) => {
    const userInfo = {
        sessionId: '',
        projectId: '',
        userId: '',
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
