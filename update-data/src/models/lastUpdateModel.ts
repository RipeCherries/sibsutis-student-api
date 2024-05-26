import mongoose, { Document, Model, Schema } from 'mongoose';

export interface LastUpdateInterface extends Document {
  date: number;
}

const lastUpdateSchema: Schema = new Schema(
  {
    date: {
      type: Number,
      required: [true, 'The date field must be filled in.'],
    },
  },
  {
    versionKey: false,
  },
);

const LastUpdate: Model<LastUpdateInterface> = mongoose.model<LastUpdateInterface>(
  'LastUpdate',
  lastUpdateSchema,
  'last-update',
);

export default LastUpdate;
