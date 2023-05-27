const express = require('express');
const router = express.Router();
const Event = require('../model/event');

// Create a new event
router.post('/events', async (req, res) => {
  try {
    const { name, files, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
    const event = new Event({ name, files, tagline, schedule, description, moderator, category, sub_category, rigor_rank });
    await event.save();
    res.json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all events
router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete an event
router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    const event = await Event.findByIdAndUpdate(id, eventData, { new: true });
    res.json({ event, message: 'Event updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// Get latest events with pagination
router.get('/events', async (req, res) => {
  try {
    const { type, limit, page } = req.query;
    let query = {};

    if (type === 'latest') {
      query = Event.find().sort({ _id: -1 }).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
    } else {
      query = Event.find();
    }

    const events = await query;
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;


module.exports = router;
