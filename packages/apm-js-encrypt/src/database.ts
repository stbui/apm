import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('data.db', function (err) {
    if (err) throw err;
    console.log('connect database successfully');
});

// db.close(function (err) {
//     if (err) {
//         return console.log(err.message)
//     }
//     console.log('close database connection')
// })

export class Sessions {
    constructor() {
        db.serialize(function () {
            // db.run('DROP TABLE IF EXISTS "sessions";');
            db.run(
                `CREATE TABLE IF NOT EXISTS sessions 
    (
        session_id              integer         PRIMARY KEY,
        project_id              integer         NOT NULL,
        tracker_version         varchar         NOT NULL,
        start_ts                integer         NOT NULL,
        duration                integer         NULL,
        rev_id                  varchar                     DEFAULT NULL,
        platform                varchar                     DEFAULT web,
        is_snippet              boolean         NOT NULL    DEFAULT FALSE,
        user_id                 varchar                     DEFAULT NULL,
        user_anonymous_id       varchar                     DEFAULT NULL,
        user_uuid               varchar         NOT NULL,
        user_agent              varchar                     DEFAULT NULL,
        user_os                 varchar         NOT NULL,
        user_os_version         varchar                     DEFAULT NULL,
        user_browser            varchar                     DEFAULT NULL,
        user_browser_version    varchar                     DEFAULT NULL,
        user_device             varchar         NOT NULL,
        user_device_type        varchar         NOT NULL,
        user_device_memory_size integer                     DEFAULT NULL,
        user_device_heap_size   integer                     DEFAULT NULL,
        user_country            varchar         NOT NULL,
        pages_count             integer         NOT NULL DEFAULT 0,
        events_count            integer         NOT NULL DEFAULT 0,
        errors_count            integer         NOT NULL DEFAULT 0,
        watchdogs_score         integer         NOT NULL DEFAULT 0,
        issue_score             integer         NOT NULL DEFAULT 0,
        issue_types             varchar         NOT NULL DEFAULT '',
        utm_source              varchar         NULL     DEFAULT NULL,
        utm_medium              varchar         NULL     DEFAULT NULL,
        utm_campaign            varchar         NULL     DEFAULT NULL,
        referrer                varchar         NULL     DEFAULT NULL,
        base_referrer           varchar         NULL     DEFAULT NULL,
        metadata_1              varchar                  DEFAULT NULL,
        metadata_2              varchar                  DEFAULT NULL,
        metadata_3              varchar                  DEFAULT NULL,
        metadata_4              varchar                  DEFAULT NULL,
        metadata_5              varchar                  DEFAULT NULL,
        metadata_6              varchar                  DEFAULT NULL,
        metadata_7              varchar                  DEFAULT NULL,
        metadata_8              varchar                  DEFAULT NULL,
        metadata_9              varchar                  DEFAULT NULL,
        metadata_10             varchar                  DEFAULT NULL
    );`,
                err => {
                    if (err !== null) {
                        throw err;
                    }
                    console.log('create table sessions');
                }
            );
        });
    }

    insert(obj) {
        console.log('[session][insert]');

        const sql = `INSERT INTO sessions 
        (
            session_id, 
            project_id, 
            start_ts,
			user_uuid, 
            user_device, 
            user_device_type, 
            user_country,
			user_os, 
            user_os_version,
			rev_id, 
			tracker_version, 
            issue_score,
			platform,
			user_agent, 
            user_browser, 
            user_browser_version, 
            user_device_memory_size, 
            user_device_heap_size,
			user_id
        ) VALUES (
            $session_id, 
            $project_id, 
            $start_ts,
			$user_uuid, 
            $user_device, 
            $user_device_type, 
            $user_country,
			$user_os, 
            $user_os_version,
			$rev_id, 
            $tracker_version, 
            $issue_score,
			$platform,
			$user_agent, 
            $user_browser, 
            $user_browser_version, 
            $user_device_memory_size, 
            $user_device_heap_size,
			$user_id
        );`;

        return new Promise((resolve, reject) => {
            db.run(
                sql,
                {
                    $session_id: obj.sessionID,
                    $project_id: obj.projectID,
                    $start_ts: obj.startTimestamp,
                    $user_uuid: obj.userUUID,
                    $user_device: '1',
                    $user_device_type: '1',
                    $user_country: '1',
                    $user_os: '1',
                    $user_os_version: '1',
                    $rev_id: '1',
                    $tracker_version: '1',
                    $issue_score: '1',
                    $platform: '1',
                    $user_agent: '1',
                    $user_browser: '1',
                    $user_browser_version: '1',
                    $user_device_memory_size: '1',
                    $user_device_heap_size: '1',
                    $user_id: obj.userID,
                },
                function (err) {
                    if (err !== null) {
                        return reject(err);
                    }

                    resolve(this.lastID);
                }
            );
        });
    }

    query(sessionId: number) {
        console.log('[session][query]', sessionId);

        const sql = 'SELECT * FROM sessions WHERE session_id = $session_id';
        return new Promise(resolve => {
            db.all(
                sql,
                {
                    $session_id: sessionId,
                },
                (err, rows) => {
                    resolve(rows);
                }
            );
        });
    }

    update(sessionId, value) {
        console.log('[session][update]', sessionId, value);
        const sql = 'UPDATE sessions SET session_id = $sessionId WHERE start_ts = $start_ts';

        db.run(sql, {
            $sessionId: sessionId,
            $start_ts: value.startTimestamp,
        });
    }

    remove(sessionId) {
        console.log('[session][update]', sessionId);
        db.run(
            'DELETE FROM sessions WHERE sessionId = $sessionId',
            {
                $sessionId: sessionId,
            },
            function (err) {
                if (err) {
                    return console.log(err.message);
                }

                console.log('deleted: ', this);
            }
        );
    }
}

export class SessionControl {
    sessionId: number;
    sessions: Sessions = new Sessions();

    constructor() {}

    generateId() {
        return 6062739610258400;
        // return Math.floor(Math.random() * new Date().getTime());
    }

    async start({ timestamp, userUUID, userID }) {
        // 如果已经存在的，只更新数据
        this.sessionId = this.generateId();
        const projectID = '3296';

        try {
            await this.sessions.insert({
                sessionID: this.sessionId,
                startTimestamp: 0,
                delay: 0,
                projectID: projectID,
                userID: '1',
                userUUID: 'userUUID',
            });
        } catch (e) {
            // 存在
        }

        // 1nkms8z8pa2.kyh2v1yz.13nuC7Gc9o7ZHLoA38ZzVT1jmQbzzDD1BiNWAT4pSPit
        // const token = { projectId: 1, sessionId: 1, userId: 1 };

        return {
            // timestamp: 0,
            // 下次开始时间
            // startTimestamp: timestamp,
            // delay: 0,
            // token: '2571aahe205.12e.lb0pwuya.7452Ag1X5rk2KFPbF8NBqjAeeER9CkkPXNA9ytiREQbH',
            // userUUID: 'userUUID',
            // sessionID: this.sessionId,
            // projectID: projectID,
            // beaconSizeLimit: 2900000,

            timestamp: 0,
            delay: 0,
            token: '1nkms8z8pa2.kyh2v1yz.13nuC7Gc9o7ZHLoA38ZzVT1jmQbzzDD1BiNWAT4pSPit',
            userUUID: 'e23a1491-21ab-438f-b5c2-838ddf1797d8',
            sessionID: '6062739610258400',
            beaconSizeLimit: 10000000,
        };
    }

    async getSessionById(sessionId) {
        const _sessions = await this.sessions.query(sessionId);
        const session = _sessions[0];

        const url = `http://127.0.0.1:8888/${session.project_id}/sessions/${session.session_id}`;

        const domURL = [`${url}/dom.mobs`];
        const mobsUrl = [];
        const devtoolsURL = [];
        // const devtoolsURL = [`${url}/devtools.mob`];

        return {
            data: {
                sessionId: session.session_id,
                projectId: session.project_id,
                startTs: session.start_ts,
                duration: 3000,
                userId: session.user_id,
                userAnonymousId: null,
                userUuid: session.user_uuid,
                userAgent: session.user_agent,
                userOs: session.user_agent,
                userBrowser: session.user_browser,
                userDevice: session.user_device,
                userDeviceType: session.user_device_type,
                userCountry: session.user_country,
                pagesCount: 5,
                eventsCount: 54,
                errorsCount: 0,
                revId: null,
                userOsVersion: session.user_os_version,
                userBrowserVersion: '89.0.4389',
                userDeviceHeapSize: 4294705152,
                userDeviceMemorySize: 8192,
                trackerVersion: '4.1.5',
                watchdogsScore: 0,
                platform: 'web',
                issueScore: 1668429134,
                issueTypes: '{dead_click,memory,cpu}',
                isSnippet: false,
                rehydrationId: null,
                utmSource: null,
                utmMedium: null,
                utmCampaign: null,
                referrer: null,
                baseReferrer: null,
                fileKey: null,
                projectKey: 'FC8cwpO5yLvmHKidhn6X',
                favorite: false,
                viewed: true,
                events: [],
                stackEvents: [],
                errors: [],
                userEvents: [],
                domURL: domURL,
                mobsUrl: mobsUrl,
                devtoolsURL: devtoolsURL,
                resources: [],
                notes: [],
                metadata: {},
                issues: [],
                live: false,
                inDB: true,
            },
        };
    }
}

export class ProjectsService {
    constructor() {
        db.serialize(function () {
            // db.run('DROP TABLE IF EXISTS "sessions";');
            db.run(
                `CREATE TABLE IF NOT EXISTS projects 
                (
                    project_id                integer generated BY DEFAULT AS IDENTITY PRIMARY KEY,
                    project_key               varchar(20)                 NOT NULL UNIQUE DEFAULT generate_api_key(20),
                    name                      text                        NOT NULL,
                    active                    boolean                     NOT NULL,
                    sample_rate               smallint                    NOT NULL        DEFAULT 100 CHECK (sample_rate >= 0 AND sample_rate <= 100),
                    created_at                timestamp without time zone NOT NULL        DEFAULT (now() at time zone 'utc'),
                    deleted_at                timestamp without time zone NULL            DEFAULT NULL,
                    max_session_duration      integer                     NOT NULL        DEFAULT 7200000,
                    metadata_1                text                                        DEFAULT NULL,
                    metadata_2                text                                        DEFAULT NULL,
                    metadata_3                text                                        DEFAULT NULL,
                    metadata_4                text                                        DEFAULT NULL,
                    metadata_5                text                                        DEFAULT NULL,
                    metadata_6                text                                        DEFAULT NULL,
                    metadata_7                text                                        DEFAULT NULL,
                    metadata_8                text                                        DEFAULT NULL,
                    metadata_9                text                                        DEFAULT NULL,
                    metadata_10               text                                        DEFAULT NULL,
                    save_request_payloads     boolean                     NOT NULL        DEFAULT FALSE,
                    gdpr                      jsonb                       NOT NULL        DEFAULT '{
                      "maskEmails": true,
                      "sampleRate": 33,
                      "maskNumbers": false,
                      "defaultInputMode": "plain"
                    }'::jsonb,
                    first_recorded_session_at timestamp without time zone NULL            DEFAULT NULL,
                    sessions_last_check_at    timestamp without time zone NULL            DEFAULT NULL
                );`,
                err => {
                    if (err !== null) {
                        throw err;
                    }
                    console.log('create table sessions');
                }
            );
        });
    }
}

export class ProjectsControl {
    constructor() {}

    toJSON() {
        return {
            data: [
                {
                    projectId: 3296,
                    name: 'my first project',
                    projectKey: 'FC8cwpO5yLvmHKidhn6X',
                    saveRequestPayloads: false,
                    gdpr: { maskEmails: true, sampleRate: 33, maskNumbers: false, defaultInputMode: 'plain' },
                    stackIntegrations: false,
                    recorded: true,
                    status: 'red',
                },
            ],
        };
    }
}

export class UserService {
    constructor() {
        db.serialize(function () {
            // db.run('DROP TABLE IF EXISTS "sessions";');
            db.run(
                `CREATE TABLE IF NOT EXISTS users 
                (
                    user_id       integer generated BY DEFAULT AS IDENTITY PRIMARY KEY,
                    email         text                        NOT NULL UNIQUE,
                    role          user_role                   NOT NULL DEFAULT 'member',
                    name          text                        NOT NULL,
                    created_at    timestamp without time zone NOT NULL default (now() at time zone 'utc'),
                    deleted_at    timestamp without time zone NULL     DEFAULT NULL,
                    api_key       text UNIQUE                          default generate_api_key(20) not null,
                    jwt_iat       timestamp without time zone NULL     DEFAULT NULL,
                    data          jsonb                       NOT NULL DEFAULT '{}'::jsonb,
                    weekly_report boolean                     NOT NULL DEFAULT TRUE
                );`,
                err => {
                    if (err !== null) {
                        throw err;
                    }
                    console.log('create table sessions');
                }
            );
        });
    }
}

export class ErrorsService {
    // CREATE TABLE errors
    //         (
    //             error_id             text         NOT NULL PRIMARY KEY,
    //             project_id           integer      NOT NULL REFERENCES projects (project_id) ON DELETE CASCADE,
    //             source               error_source NOT NULL,
    //             name                 text                  DEFAULT NULL,
    //             message              text         NOT NULL,
    //             payload              jsonb        NOT NULL,
    //             status               error_status NOT NULL DEFAULT 'unresolved',
    //             parent_error_id      text                  DEFAULT NULL REFERENCES errors (error_id) ON DELETE SET NULL,
    //             stacktrace           jsonb, --to save the stacktrace and not query S3 another time
    //             stacktrace_parsed_at timestamp
    //         );
    constructor() {}
}

export class AccountControl {
    constructor() {}

    toJSON() {
        return {
            data: {
                userId: 4339,
                tenantId: 2566,
                email: 'w431106@gmail.com',
                role: 'owner',
                name: 'demo',
                verifiedEmail: true,
                superAdmin: true,
                admin: false,
                member: false,
                origin: null,
                roleId: 9775,
                roleName: 'Owner',
                permissions: ['SESSION_REPLAY', 'DEV_TOOLS', 'METRICS', 'ASSIST_LIVE', 'ASSIST_CALL'],
                allProjects: true,
                hasPassword: true,
                isEnterprise: false,
                plan: { type: 'free', remainingSessions: 1000, billingSetup: false, remainingTrialDays: 0 },
                hasActivePlan: false,
                edition: 'ee',
                expirationDate: -1,
                versionNumber: 'v1.9.0-saas',
                tenantName: 'ch',
                apiKey: 'wdD7B78dUgxovdYYUV85',
                optOut: false,
                smtp: true,
                saml2: false,
            },
        };
    }
}
