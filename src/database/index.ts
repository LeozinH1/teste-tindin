import mongoose from 'mongoose'

export default async (): Promise<void> => {
  await mongoose.connect("mongodb://localhost:27017/tindin");
};




