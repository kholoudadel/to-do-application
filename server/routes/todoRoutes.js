const express = require('express');
const todoController = require('./todoController');
const authMiddleware = require('./authMiddleware');

const router = express.Router();

// Require authentication for all to-do related endpoints
router.use(authMiddleware.requireAuth);

router.post('/', todoController.create);
router.get('/', todoController.read);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;
