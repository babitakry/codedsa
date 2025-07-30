import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER"
  },
  summary: {
    type: String,
  },
  country: {
    type: String,
  },
  college: {
    type: String,
  },
  language_used: {
    type: Object, 
  },
  solved_no_questions: {
    type: Number,
    default: 0,
  },
  social_links: [
    {
      platform: {
        type: String
      },
      url: {
        type: String
      }
    }
  ],
  skills: {
    type: Object,
  },
  total_submission: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });



export const User = mongoose.model("User", userSchema);

