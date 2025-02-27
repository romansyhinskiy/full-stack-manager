const express = require("express");
const {createTodo, addCategory, getAllCategories, getAllTodos, deleteTodo, editTodo, getTodoById} = require("../controllers/todo");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post('/new-todo', authMiddleware, createTodo);
router.post('/new-category', authMiddleware, addCategory);
router.get('/category', authMiddleware, getAllCategories);
router.get('/todos', authMiddleware, getAllTodos);
router.delete('/delete-todo', authMiddleware, deleteTodo);
router.patch('/edit-todo/:id', authMiddleware,  editTodo);
router.get('/todo-by-id/:id', authMiddleware,  getTodoById);

module.exports = router;