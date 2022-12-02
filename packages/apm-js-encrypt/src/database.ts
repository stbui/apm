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
            db.run('DROP TABLE IF EXISTS "sessions";');
            db.run(
                `CREATE TABLE sessions 
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

    insert() {
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

        db.run(sql, {
            $session_id: 2,
            $project_id: '1',
            $start_ts: '1',
            $user_uuid: '1',
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
            $user_id: '1',
        });
    }

    query() {
        const sql = 'SELECT * FROM sessions WHERE sessionId = ?';
        db.all(sql, {}, () => {});
    }

    update() {
        const sql = 'UPDATE sessions SET sessionId = $sessionId WHERE name = ?';

        db.run(sql, {
            $sessionId: 1,
        });
    }

    remove() {
        db.run('DELETE FROM sessions WHERE sessionId = ?', ['1'], function (err) {
            if (err) {
                return console.log(err.message);
            }

            console.log('deleted: ', this);
        });
    }
}
