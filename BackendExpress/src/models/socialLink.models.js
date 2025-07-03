import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true, // e.g., 'LinkedIn', 'GitHub'
  },
  url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

export default SocialLink;
