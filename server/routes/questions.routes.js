const Router = require('express');
const router = new Router();
const Question = require('../mongo/models/QuestionModel');

router.post("/questions", async (req, res) => {
    const question = new Question(req.body);
    try {
        if (!question) return res.status(400).json({ message: "Please fill the data" });
        await question.save();
        res.status(200).json({ message: 'Question Created', question});
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(201).send({ questions });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.patch("/questions/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const validUpdates = ['title', 'options'];
    const isValidUpdate = updates.every(update => validUpdates.includes(update));
    if (!isValidUpdate) return res.status(400).json({ message: 'Invalid operation' });
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) return res.status(404).json({ message: 'No question found' });
        res.json({ message: 'Question Updated' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete("/questions/:id", async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).send('No question found');
        res.json({ id: question._id });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;