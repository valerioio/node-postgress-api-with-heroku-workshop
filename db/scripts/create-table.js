const { query } = require("../index");

query(`CREATE TABLE pokemon(
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT[],
    HP INTEGER,
    Attack INTEGER,
    Defense INTEGER,
    "Sp. Attack" INTEGER,
    "Sp. Defense" INTEGER,
    Speed INTEGER
)`);
