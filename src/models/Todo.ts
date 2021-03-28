import mongoose from 'mongoose'

interface Todo {
  title: string;
  description: string;
}

interface todoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: Todo): TodoDoc
}

interface TodoDoc extends mongoose.Document {
  title: string;
  description: string;
}

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  }
})

todoSchema.statics.build = (attr: Todo) => {
  return new TodoModel(attr)
}

const TodoModel = mongoose.model<TodoDoc, todoModelInterface>('Todo', todoSchema)

TodoModel.build({
  title: 'some title',
  description: 'some description'
})


// TodoModel.create([
//   {title: "test1", description: 8},
//   {title: "test2", description: 18},
//   {title: "test3", description: 28},
//   {title: "test4", description: 38},
//   {title: "test5", description: 48},
//   {title: "test6", description: 58},
//   {title: "test7", description: 68},
//   {title: "test8", description: 18},
//   {title: "test9", description: 18},
//   {title: "test10",description: 18}
//   ], function (error, docs) {
//   if(error) {
//   console.log(error);
//   } else {
//   console.log('save ok');
//   // console.log(docs);
//   }
//   });

export default TodoModel
