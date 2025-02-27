const Todo = require("../schema/Todo");
const {Types} = require("mongoose");
const Category = require("../schema/Category");

const createTodo = async (req, res, next) => {
  const { title, completed, description, due_date, category } = req.body;
  const userId = req.user.id;

  if(!title){
    res.status(400).json({message: 'title is required'});
  }

  try{

    let categoryId = null; // Default to null if category is not provided
    let categoryData = null;

    if (category) {
      if (Types.ObjectId.isValid(category)) {
        const foundCategory = await Category.findById(category)

        if(foundCategory){
          categoryData = {
            id: foundCategory._id,
            name: foundCategory.name,
          }
        }else{
          return res.status(404).json({message: 'Category not found'});
        }
        categoryId = category; // If it's already an ObjectId, use it
      } else if (typeof category === "string") {
        const foundCategory = await Category.findOne({ name: category });
        if (foundCategory) {
          categoryId = foundCategory._id; // Convert to ObjectId
        } else {
          categoryId = null
        }
      }
    }

    const newTodo = new Todo({
      title,
      completed,
      description,
      due_date,
      category: categoryData,
      user: userId,
    })
    const todo = await newTodo.save();
    res.json(todo);
  }catch (error){
    console.error(error);
  }
}

const addCategory = async (req, res, next) => {
  const {name} = req.body;
  const userId = req.user.id;

  if(!name){
    res.status(400).json({message: 'name is required'});
  }

  try{
    const newCategory = new Category({
      name,
      user: userId,
    })
    const category = await newCategory.save();
    res.json({category});
  }catch (error){
    console.error(error);
  }
}

const getAllCategories = async (req, res, next) => {
  try{
    const userId = req.user.id;

    const category = await Category.find({ user: userId });
    res.status(200).json(category);
  }catch (error){
    console.error(error)
    res.status(500).json({ message: "Server error" });
  }
}

const getAllTodos = async (req, res, next) => {
  try{
    const userId = req.user.id;

    const todos = await Todo.find({user: userId})
    res.status(200).json(todos)
  }catch (error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const deleteTodo = async (req, res, next) => {
  const {_id} = req.body;

  try{
    const deletedTodo = await Todo.findByIdAndDelete(_id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(deletedTodo)
  }catch (error){
    console.error(error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
}

const editTodo = async (req, res, next) => {
  const {id} = req.params;
  const { title, description, due_date, category} = req.body;

  try{
    const editedTodo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
      due_date,
      category,
    })
    res.status(200).json(editedTodo)
  }catch (error){
    console.error(error);
    res.status(500).json({ message: "Failed to edit todo" });
  }
}

const getTodoById = async (req, res, next) => {
  const {id} = req.params;

  try{
    const todo = await Todo.findById(id);
    res.status(200).json(todo)
  }catch (error){
    console.error(error);
    res.status(500).json({ message: "Failed to fetch todo by id" });
  }
}

module.exports = {createTodo, addCategory, getAllCategories, getAllTodos, deleteTodo, editTodo, getTodoById}