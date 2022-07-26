const express = require('express')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()

router.get('/fetachallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (err) {
        console.log(err)
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'D n').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erors: errors.array() })
        }

        const notes = new Notes({
            title, description,tag:'default', user: req.user.id
        })
        const savedNote = await notes.save()

        res.json(savedNote);
    } catch (err) {
        console.log(err)
    }
})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description} = req.body
    try {
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }



        //find the note
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send('not found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    console.log('id',req.params.id)
    try {
        //find the note
        let note = await Notes.findByIdAndDelete(req.params.id);
        if (!note) { res.status(404).send('not found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        res.json(note)
    } catch (error) {
        console.log(error)
    }

})

module.exports = router