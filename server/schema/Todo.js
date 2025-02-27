const mongoose = require('mongoose');
const {Category} = require("./Category");
const { Schema } = mongoose;


const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: String,
  category: {
    id: {type: Schema.Types.ObjectId, ref: 'Category'},
    name: String,
  },
  due_date: Date,
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
})

const Todo = mongoose.model('Todo', TodoSchema)
module.exports = Todo