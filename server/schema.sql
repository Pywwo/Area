CREATE TABLE IF NOT EXISTS users
(
    id              serial      PRIMARY KEY,
    username        text        NOT NULL UNIQUE,
    password        text        NOT NULL,
    email           text        NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS services
(
    id              serial      PRIMARY KEY,
    user_id         integer     NOT NULL REFERENCES users ON DELETE CASCADE,
    name            text        NOT NULL,
    oauth           boolean     DEFAULT FALSE,
    token           text,
    refresh_token   text
);

CREATE TABLE IF NOT EXISTS applets
(
    id              serial      PRIMARY KEY,
    user_id         integer     NOT NULL REFERENCES users ON DELETE CASCADE,
    name            text        NOT NULL,
    enabled         boolean     DEFAULT FALSE,
    description     text,
    created_at      TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS actions
(
    id              serial      PRIMARY KEY,
    service_id      integer     NOT NULL REFERENCES services,
    applet_id       integer     NOT NULL REFERENCES applets ON DELETE CASCADE,
    name            text        NOT NULL,
    params          json        NOT NULL,
    polling         boolean     DEFAULT TRUE,
    poll_data       json
);

CREATE TABLE IF NOT EXISTS reactions
(
    id              serial      PRIMARY KEY,
    service_id      integer     NOT NULL REFERENCES services,
    applet_id       integer     NOT NULL REFERENCES applets ON DELETE CASCADE,
    params          json        NOT NULL,
    name            text        NOT NULL
);

CREATE TABLE IF NOT EXISTS displays
(
    id              serial      PRIMARY KEY,
    user_id         integer     NOT NULL REFERENCES users ON DELETE CASCADE,
    color           text,
    title           text,
    content         text,
    service         text,
    created_at      TIMESTAMP   NOT NULL DEFAULT NOW()
);
