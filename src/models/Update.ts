import mongoose, { Schema, Document } from 'mongoose';

export interface IUpdate extends Document {
  title: string;
  category: string;
  lastDate: string;
  eligibility: string;
  officialLink: string;
  createdAt: Date;
}

const UpdateSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  lastDate: {
    type: String,
  },
  eligibility: {
    type: String,
  },
  officialLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent mongoose from compiling the model multiple times in serverless environments
export default mongoose.models.Update || mongoose.model<IUpdate>('Update', UpdateSchema);
