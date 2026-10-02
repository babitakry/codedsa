import { executeBatchSubmissions, executeSingleSubmission } from "../services/judge0.service.js";
import { Problem } from "../models/problem.models.js";
import { Submission } from "../models/submission.models.js";
import { User } from "../models/user.models.js";

/**
 * Execute code against sample testcases or custom input without creating a submission record
 */
export const runCode = async (req, res) => {
  try {
    const { problemId, language, code, customInput, testCases } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required for execution",
      });
    }

    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Language is required for execution",
      });
    }

    let casesToRun = [];

    // 1. If custom input is explicitly supplied
    if (customInput !== undefined && customInput !== null && customInput.trim() !== '') {
      casesToRun = [{ input: customInput, output: '' }];
    }
    // 2. If testcases array is directly passed
    else if (testCases && Array.isArray(testCases) && testCases.length > 0) {
      casesToRun = testCases;
    }
    // 3. If problemId is provided, fetch examples from Problem
    else if (problemId) {
      const problem = await Problem.findById(problemId);
      if (problem && problem.examples && problem.examples.length > 0) {
        casesToRun = problem.examples.map((ex) => ({
          input: ex.input,
          output: ex.output,
        }));
      }
    }

    // Fallback if no testcase is available
    if (casesToRun.length === 0) {
      casesToRun = [{ input: '', output: '' }];
    }

    const executionResult = await executeBatchSubmissions({
      language,
      code,
      testCases: casesToRun,
    });

    return res.status(200).json({
      success: true,
      message: "Code executed successfully",
      data: executionResult,
    });
  } catch (error) {
    console.error("Error in runCode controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to execute code",
    });
  }
};

/**
 * Submit code against all test cases (examples, custom_test_cases, hidden test_cases)
 * and persist submission in database if user is authenticated
 */
export const submitCode = async (req, res) => {
  try {
    const { problemId, language, code } = req.body;

    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: "Problem ID is required for submission",
      });
    }

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required for submission",
      });
    }

    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Language is required for submission",
      });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // Gather all testcases for judging
    const allTestCases = [];

    // Add examples
    if (problem.examples && Array.isArray(problem.examples)) {
      problem.examples.forEach((ex) => {
        if (ex.input) {
          allTestCases.push({
            input: ex.input,
            output: ex.output || '',
          });
        }
      });
    }

    // Add custom_test_cases if any
    if (problem.custom_test_cases && Array.isArray(problem.custom_test_cases)) {
      problem.custom_test_cases.forEach((tc) => {
        if (tc.input) {
          allTestCases.push({
            input: tc.input,
            output: tc.expectedOutput || '',
          });
        }
      });
    }

    // Fallback if no testcase
    if (allTestCases.length === 0) {
      if (problem.test_case) {
        allTestCases.push({ input: problem.test_case, output: '' });
      } else {
        allTestCases.push({ input: '', output: '' });
      }
    }

    // Execute batch judging
    const executionResult = await executeBatchSubmissions({
      language,
      code,
      testCases: allTestCases,
    });

    let savedSubmission = null;

    // If user is authenticated, persist submission and update user stats
    if (req.user) {
      const user = req.user;

      savedSubmission = new Submission({
        userId: user._id,
        problemId: problem._id,
        code,
        language,
        status: executionResult.overallStatus,
        runtime: executionResult.runtime,
        memory: executionResult.memory,
        passedTestCases: executionResult.passedTestCases,
        totalTestCases: executionResult.totalTestCases,
        testCaseResults: executionResult.results,
        compileOutput: executionResult.compileOutput,
      });

      await savedSubmission.save();

      // Update user submission counts
      user.total_submission = (user.total_submission || 0) + 1;

      // If accepted, check if first time solving this problem
      if (executionResult.overallStatus === "Accepted") {
        const previousAccepted = await Submission.findOne({
          userId: user._id,
          problemId: problem._id,
          status: "Accepted",
          _id: { $ne: savedSubmission._id },
        });

        if (!previousAccepted) {
          user.solved_no_questions = (user.solved_no_questions || 0) + 1;
        }
      }

      // Update language stats
      const currentLangMap = user.language_used || {};
      currentLangMap[language] = (currentLangMap[language] || 0) + 1;
      user.language_used = currentLangMap;
      user.markModified("language_used");

      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Submission evaluated successfully",
      data: {
        submission: savedSubmission,
        ...executionResult,
      },
    });
  } catch (error) {
    console.error("Error in submitCode controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to evaluate submission",
    });
  }
};

/**
 * Get all submissions by logged-in user for a specific problem
 */
export const getProblemSubmissions = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user._id;

    const submissions = await Submission.find({
      userId,
      problemId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error("Error in getProblemSubmissions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching problem submissions",
      error: error.message,
    });
  }
};

/**
 * Get all submissions for logged-in user across all problems
 */
export const getUserSubmissions = async (req, res) => {
  try {
    const userId = req.user._id;

    const submissions = await Submission.find({ userId })
      .populate("problemId", "title difficulty sno topic")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error("Error in getUserSubmissions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching user submissions",
      error: error.message,
    });
  }
};

/**
 * Get single submission details by submission ID
 */
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await Submission.findById(id)
      .populate("userId", "username profile_pic")
      .populate("problemId", "title difficulty sno topic")
      .lean();

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error("Error in getSubmissionById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching submission",
      error: error.message,
    });
  }
};

/**
 * Get all recent submissions (Admin / Global)
 */
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("userId", "username")
      .populate("problemId", "title difficulty sno topic")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error("Error in getAllSubmissions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching all submissions",
      error: error.message,
    });
  }
};
