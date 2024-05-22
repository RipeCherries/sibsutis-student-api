import mongoose, { Document, Model, Schema } from 'mongoose';

export interface TokenInterface extends Document {
  accessToken: string;
  refreshToken: string;
}

const tokenSchema: Schema = new Schema(
  {
    accessToken: {
      type: String,
      required: [true, 'The accessToken field must be filled in.'],
    },
    refreshToken: {
      type: String,
      required: [true, 'The refreshToken field must be filled in.'],
    },
  },
  {
    versionKey: false,
  },
);

const Token: Model<TokenInterface> = mongoose.model<TokenInterface>('Token', tokenSchema, 'tokens');

export default Token;
