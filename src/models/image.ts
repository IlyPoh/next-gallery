import { Schema, models, model } from 'mongoose';

const imageSchema = new Schema({
  id: String,
  title: String,
  imageSrc: String,
});

const Image = models.Image || model('Image', imageSchema);

export default Image;
