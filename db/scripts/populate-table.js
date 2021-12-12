const { query } = require("../index");
const pokemon = require("../../pokemon-data");

for (const p of pokemon) {
  query(
    `INSERT INTO pokemon (name, type, HP, Attack, Defense, "Sp. Attack", "Sp. Defense", Speed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      p.name,
      p.type,
      p.HP,
      p.Attack,
      p.Defense,
      p["Sp. Attack"],
      p["Sp. Defense"],
      p.Speed,
    ]
  );
}
