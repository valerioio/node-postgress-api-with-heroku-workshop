const express = require("express");
const router = express.Router();
const {
  getPokemons,
  getById,
  createPokemon,
  updatePokemon,
  deletePokemon,
} = require("../models/pokemon");

router.get("/", async (req, res) => {
  res.json({
    success: true,
    message: "all the pokemons",
    payload: await getPokemons(),
  });
});

router.get("/:id", async (req, res) => {
  res.json({
    success: true,
    message: `pokemon with id: ${req.params.id}`,
    payload: await getById(req.params.id),
  });
});

router.post("/", async (req, res) => {
  res.json({
    success: true,
    message: "pokemon added",
    payload: await createPokemon(req.body),
  });
});

router.put("/:id", async (req, res) => {
  res.json({
    success: true,
    message: "pokemon updated",
    payload: await updatePokemon(
      req.body.name,
      req.body.type,
      req.body.HP,
      req.body.Attack,
      req.body.Defense,
      req.body["Sp. Attack"],
      req.body["Sp. Defense"],
      req.body.Speed,
      req.params.id
    ),
  });
});

router.delete("/:id", async (req, res) => {
  res.json({
    success: true,
    message: "pokemon deleted",
    payload: await deletePokemon(req.params.id),
  });
});

module.exports = router;
