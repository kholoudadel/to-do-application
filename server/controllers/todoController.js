const todoModel = require('../models/todoModel');

const todoController = {
  async create(req, res) {
    try {
      const { title, description } = req.body;
      const todo = await todoModel.create({ title, description, userId: req.user.id });
      res.status(201).json({ message: 'To-do created', todo });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async read(req, res) {
    try {
      const todos = await todoModel.findAllByUser(req.user.id);
      res.status(200).json({ todos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;
      const todo = await todoModel.update(id, { title, description, completed });
      res.status(200).json({ message: 'To-do updated', todo });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await todoModel.delete(id);
      res.status(200).json({ message: 'To-do deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteAll(req, res) {
    try {
      await todoModel.deleteAll();
      res.status(200).json({ message: 'To-do deleted all' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = todoController;
