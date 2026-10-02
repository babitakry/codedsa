import mongoose from "mongoose";

const testCaseResultSchema = new mongoose.Schema({
  testCaseNumber: {
    type: Number,
  },
  input: {
    type: String,
  },
  expectedOutput: {
    type: String,
  },
  actualOutput: {
    type: String,
  },
  status: {
    type: String,
  },
  passed: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
  },
  memory: {
    type: Number,
  },
  stderr: {
    type: String,
  },
});

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Compilation Error",
        "Runtime Error",
        "Memory Limit Exceeded",
        "Internal Error",
        "Pending",
      ],
      required: true,
    },
    runtime: {
      type: String,
      default: "0.00",
    },
    memory: {
      type: Number,
      default: 0,
    },
    passedTestCases: {
      type: Number,
      default: 0,
    },
    totalTestCases: {
      type: Number,
      default: 0,
    },
    testCaseResults: {
      type: [testCaseResultSchema],
      default: [],
    },
    compileOutput: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Submission = mongoose.model("Submission", submissionSchema);
