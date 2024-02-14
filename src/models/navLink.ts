import { TLink } from '@/types';
import { Schema, model, models } from 'mongoose';

const navLinkSchema = new Schema<TLink>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  src: { type: String, required: true, unique: true },
});

const NavLink = models.NavLink || model<TLink>('NavLink', navLinkSchema);

export default NavLink;
