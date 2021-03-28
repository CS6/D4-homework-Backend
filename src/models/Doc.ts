import { Document, Model, model, Schema } from "mongoose";

export interface Doc extends Document {
  doc_ID: string;
  doc_Title: string;
  date: Date;
}

const schema: Schema = new Schema({
  doc_ID: {
    type: String,
    required: true,
  },
  doc_Title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const DocModel: Model<Doc> = model("Doc", schema);

export default DocModel;
