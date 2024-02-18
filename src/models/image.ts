import { Schema, models, model } from 'mongoose';

const imageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  imageSrc: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
});

const Image = models.Image || model('Image', imageSchema);

export default Image;
