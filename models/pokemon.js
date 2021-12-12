const { query } = require("../db");

async function getPokemons() {
  return (await query("SELECT * FROM pokemon;")).rows;
}

async function getById(id) {
  return (await query("SELECT * FROM pokemon WHERE id = $1;", [id])).rows;
}

async function createPokemon(pokemon) {
  return (
    await query(
      'INSERT INTO pokemon(name, type, HP, Attack, Defense, "Sp. Attack", "Sp. Defense", Speed) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;',
      [
        pokemon.name,
        pokemon.type,
        pokemon.HP,
        pokemon.Attack,
        pokemon.Defense,
        pokemon["Sp. Attack"],
        pokemon["Sp. Defense"],
        pokemon.Speed,
      ]
    )
  ).rows;
}

async function updatePokemon(
  name,
  type,
  HP,
  Attack,
  Defense,
  SpAttack,
  SpDefense,
  Speed,
  id
) {
  return (
    await query(
      'UPDATE pokemon SET name =$1, type=$2, HP=$3, Attack=$4, Defense=$5, "Sp. Attack"=$6, "Sp. Defense"=$7, Speed=$8 WHERE id=$9 RETURNING *;',
      [name, type, HP, Attack, Defense, SpAttack, SpDefense, Speed, id]
    )
  ).rows;
}

async function deletePokemon(id) {
  return (await query("DELETE FROM pokemon WHERE id=$1 RETURNING *;", [id]))
    .rows;
}

module.exports = {
  getPokemons,
  getById,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
