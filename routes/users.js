const express = require("express");
const router = express.Router();
const {User} = require("../models/index")

router.get("/", async (req, res) => {
    try {
        const data = await User.findAll();
        res.json(data);
    } catch (err) {
        res.sendStatus(500);
        console.error(err)
    }
})

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
})

router.post("/", async (req, res) => {
    try {
        const user = User.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
    }
})

router.put("/:id", async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id);
        if (!user) return res.sendStatus(404);
        user = await user.update(req.body, {where: {id: req.params.id}})
        res.status(201).json(user)
    } catch (err) {
        res.sendStatus(500)
        console.error(err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id);
        if (!user) return res.sendStatus(404);
        user = user.destroy()
        res.send(user)
    } catch (err) {
        res.sendStatus(500);
        console.error(err)
    }
})

module.exports = router