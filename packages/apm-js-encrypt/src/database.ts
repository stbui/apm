import path from 'path';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('data.db', function (err) {
    if (err) throw err;
    console.log('[]链接数据库成功！');
});

export class database {
    private db: sqlite3.Database;

    filename: string = 'data.db';

    constructor() {
        if (!this.db) {
            this.db = new sqlite3.Database('data.db', function (err) {
                if (err) throw err;
                console.log('[]链接数据库成功！');
            });
        }
    }

    select() {}

    findOne() {}

    find() {}

    add() {}

    update() {}

    delete() {}

    query() {}
}

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
                    console.log('[创建表]: sessions');
                }
            );
        });
    }

    insert(sessionID: number, s) {
        console.log('[session][insert]', sessionID);

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
            $sessionID, 
            $ProjectID, 
            $Timestamp,
			$UserUUID, 
            $UserDevice, 
            $UserDeviceType, 
            $UserCountry,
			$UserOS, 
            $UserOSVersion,
			$RevID, 
            $TrackerVersion, 
            $issue_score,
			$Platform,
			$UserAgent, 
            $UserBrowser, 
            $UserBrowserVersion, 
            $UserDeviceMemorySize, 
            $UserDeviceHeapSize,
			$UserID
        );`;

        return new Promise((resolve, reject) => {
            db.run(
                sql,
                {
                    $sessionID: sessionID,
                    $ProjectID: s.ProjectID,
                    $Timestamp: s.Timestamp,
                    $UserUUID: s.UserUUID,
                    $UserDevice: s.UserDevice,
                    $UserDeviceType: s.UserDeviceType,
                    $UserCountry: s.UserCountry,
                    $UserOS: s.UserOS,
                    $UserOSVersion: s.UserOSVersion,
                    $RevID: s.RevID,
                    $TrackerVersion: s.TrackerVersion,
                    $issue_score: s.Timestamp / 1000,
                    $Platform: s.Platform,
                    $UserAgent: s.UserAgent,
                    $UserBrowser: s.UserBrowser,
                    $UserBrowserVersion: s.UserBrowserVersion,
                    $UserDeviceMemorySize: s.UserDeviceMemorySize,
                    $UserDeviceHeapSize: s.UserDeviceHeapSize,
                    $UserID: s.UserID,
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
        console.log('[query][session]', sessionId);

        const sql = 'SELECT * FROM sessions WHERE session_id = $session_id';
        return new Promise((resolve, reject) => {
            db.all(
                sql,
                {
                    $session_id: sessionId,
                },
                (err, rows) => {
                    if (err !== null) {
                        return reject(err);
                    }

                    const newRows = rows.map(row => {
                        const temp = {};
                        Object.keys(row).map(kv => (temp[toHump(kv)] = row[kv]));
                        return temp;
                    });

                    resolve(newRows);
                }
            );
        });
    }

    findOne(sessionId: number): Promise<any> {
        return this.query(sessionId).then((rows: any) => {
            if (rows.length) {
                return rows[0];
            }

            return {};
        });
    }

    queryAll(project_id) {
        console.log('[session][query]', project_id);

        const sql = 'SELECT * FROM sessions WHERE project_id = $project_id';
        return new Promise(resolve => {
            db.all(
                sql,
                {
                    $project_id: project_id,
                },
                (err, rows) => {
                    const newRows = rows.map(row => {
                        const temp = {};
                        Object.keys(row).map(kv => (temp[toHump(kv)] = row[kv]));
                        return temp;
                    });

                    resolve(newRows);
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

    async start(data) {}

    insertWebSessionStart(sessionID: number, s) {
        this.sessions.insert(sessionID, {
            Platform: 'web',
            Timestamp: s.Timestamp,
            ProjectID: s.ProjectID,
            TrackerVersion: s.TrackerVersion,
            RevID: s.RevID,
            UserUUID: s.UserUUID,
            UserOS: s.UserOS,
            UserOSVersion: s.UserOSVersion,
            UserDevice: s.UserDevice,
            UserCountry: s.UserCountry,
            UserAgent: s.UserAgent,
            UserBrowser: s.UserBrowser,
            UserBrowserVersion: s.UserBrowserVersion,
            UserDeviceType: s.UserDeviceType,
            UserDeviceMemorySize: s.UserDeviceMemorySize,
            UserDeviceHeapSize: s.UserDeviceHeapSize,
            UserID: s.UserID,
        });
    }

    searchSessions(projectId, userId) {
        return this.sessions.queryAll(projectId);
    }

    async getSessionById(sessionId) {
        const session = await this.sessions.findOne(sessionId);

        const url = `http://127.0.0.1:8888/${session.projectId}/sessions/${session.sessionId}`;

        const domURL = [`${url}/dom.mobs`];
        const mobsUrl = [];
        const devtoolsURL = [];
        // const devtoolsURL = [`${url}/devtools.mob`];

        return {
            data: {
                sessionId: session.sessionId,
                projectId: session.projectId,
                startTs: session.startTs,
                duration: 3000,
                userId: session.userId,
                userAnonymousId: null,
                userUuid: session.userUuid,
                userAgent: session.userAgent,
                userOs: session.userOs,
                userBrowser: session.userBrowser,
                userDevice: session.userDevice,
                userDeviceType: session.userDeviceType,
                userCountry: session.userCountry,
                pagesCount: 5,
                eventsCount: 54,
                errorsCount: 0,
                revId: session.revId,
                userOsVersion: session.userOsVersion,
                userBrowserVersion: session.userBrowserVersion,
                userDeviceHeapSize: session.userDeviceHeapSize,
                userDeviceMemorySize: session.userDeviceMemorySize,
                trackerVersion: '4.1.5',
                watchdogsScore: 0,
                platform: session.platform,
                issueScore: session.issueScore,
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
                    "project_id" integer PRIMARY KEY AUTOINCREMENT,
                    "project_key" varchar(20) NOT NULL,
                    "name" text NOT NULL,
                    "active" boolean NOT NULL,
                    "sample_rate" text,
                    "created_at" text,
                    "deleted_at" text DEFAULT NULL,
                    "max_session_duration" integer NOT NULL DEFAULT 7200000,
                    "metadata_1" text DEFAULT NULL,
                    "metadata_2" text DEFAULT NULL,
                    "metadata_3" text DEFAULT NULL,
                    "metadata_4" text DEFAULT NULL,
                    "metadata_5" text DEFAULT NULL,
                    "metadata_6" text DEFAULT NULL,
                    "metadata_7" text DEFAULT NULL,
                    "metadata_8" text DEFAULT NULL,
                    "metadata_9" text DEFAULT NULL,
                    "metadata_10" text DEFAULT NULL,
                    "save_request_payloads" boolean NOT NULL DEFAULT FALSE,
                    "gdpr" text,
                    "first_recorded_session_at" text DEFAULT NULL,
                    "sessions_last_check_at" text DEFAULT NULL
                );`,
                err => {
                    if (err !== null) {
                        throw err;
                    }
                    console.log('[创建表]: projects');
                }
            );
        });
    }

    query(project_key: number) {
        console.log('[query][projects]', project_key);

        const sql = 'SELECT * FROM projects WHERE project_key = $project_key';
        return new Promise((resolve, reject) => {
            db.all(
                sql,
                {
                    $project_key: project_key,
                },
                (err, rows) => {
                    if (err !== null) {
                        return reject(err);
                    }

                    resolve(covertHump(rows));
                }
            );
        });
    }

    findOne(project_key: number): Promise<{}> {
        return this.query(project_key).then((rows: any) => {
            if (rows.length) {
                return rows[0];
            }

            return {};
        });
    }

    insert(p: {
        project_key: string;
        name: string;
        active: boolean;
        max_session_duration: number;
        save_request_payloads: boolean;
    }): Promise<any> {
        const sql = `INSERT INTO projects 
        (
            project_key,name,active,max_session_duration,save_request_payloads
        ) VALUES (
            $project_key,$name,$active,$max_session_duration,$save_request_payloads
        );`;

        return new Promise((resolve, reject) => {
            db.run(
                sql,
                {
                    $project_key: p.project_key,
                    $name: p.name,
                    $active: p.active,
                    $max_session_duration: p.max_session_duration,
                    $save_request_payloads: p.save_request_payloads,
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
}

export class ProjectsControl {
    projectsService: ProjectsService = new ProjectsService();

    constructor() {}

    create() {
        this.projectsService.insert({
            project_key: 'FC8cwpO5yLvmHKidhn6X',
            name: 'stbui',
            active: true,
            max_session_duration: 1000,
            save_request_payloads: false,
        });
    }

    findOne(projectKey: string) {
        return {
            projectId: 3296,
            name: 'stbui',
            projectKey: 'FC8cwpO5yLvmHKidhn6X',
            saveRequestPayloads: false,
            gdpr: { maskEmails: true, sampleRate: 33, maskNumbers: false, defaultInputMode: 'plain' },
            stackIntegrations: false,
            recorded: true,
            status: 'red',
        };
    }

    toJSON() {
        return {
            data: [
                {
                    projectId: 3296,
                    name: 'stbui',
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
                    created_at    text NOT NULL default (now() at time zone 'utc'),
                    deleted_at    text NULL     DEFAULT NULL,
                    api_key       text UNIQUE                          default generate_api_key(20) not null,
                    jwt_iat       text NULL     DEFAULT NULL,
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

export function toHump(name) {
    return name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
}

export function covertHump(rows: any[]): any[] {
    return rows.map(row => {
        const temp = {};
        Object.keys(row).map(kv => (temp[toHump(kv)] = row[kv]));
        return temp;
    });
}

export class Config {
    public _storePath: string;

    constructor() {}

    set storePath(value: string) {
        this._storePath = path.join(process.cwd(), value);
    }

    get storePath() {
        return this._storePath;
    }
}

export class UserAgent {
    constructor() {}
}
