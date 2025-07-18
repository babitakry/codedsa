import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
});

const testCaseSchema = new mongoose.Schema({
    input: {
      type: String,
      required: true
    },
    expectedOutput: {
      type: String,
      required: true
    }
  });
  

const problemSchema = new mongoose.Schema({
    sno: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },  
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    examples: {
        type: [exampleSchema],
        required: true
    },
    test_case: {
        type: String,
        required: true
    },
    custom_test_cases: {
        type: [testCaseSchema],
        default: []  // Optional test cases entered by the user
    },
    constraints: { 
        type: [String], 
        required: true 
    }, 
    boiler_plate_code: [
        {
            lang: {
                type: String,
                required: true,
            },
            code: {
                type: String,
                required: true,
            }
        }
    ],
},
    { timestamps: true }
);

export const Problem = mongoose.model("Problem", problemSchema);
