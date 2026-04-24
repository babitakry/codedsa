import { Problem } from "../models/problem.models.js";

export const createProblem = async (req, res) => {
  const data = req.body;
  try {
    const adminUser = req.user; // comes from authMiddleware
    console.log("Admin user creating problem:", adminUser);

    const {
      sno,
      title,
      difficulty,
      topic,
      description,
      constraints,
      examples,
      test_case,
      boiler_plate_code
    } = req.body;


    if (!sno || !title || !difficulty || !topic || !description || !constraints || !examples || !test_case || !boiler_plate_code) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    const check_title = await Problem.findOne({ title: title });

    if (check_title) {
      return res.status(409).json({
        success: false,
        message: "Title already exist !!"
      })
    }
    const newProblem = new Problem(data);
    const savedProblem = await newProblem.save();

    res.status(201).json({
      success: true,
      message: `Problem created successfully with this id ${savedProblem._id}`,
      data: savedProblem
    });
  }
  catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Request param id:", id);

    const problem_exist = await Problem.findById(id);

    if (!problem_exist) {
      return res.status(404).json({
        success: false,
        message: `Problem with id ${id} does not exist`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Problem with id ${problem_exist._id} exists`,
      data: problem_exist
    });
  } catch (err) {
    console.error("Error in getProblemById:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const { searchTerm, sortLevel } = req.query;

    let filter = {};

    //Case-insensitive search by title or description
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      filter.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ];
    }

    // Filter by difficulty level if provided
    if (sortLevel) {
      filter.difficulty = sortLevel; // Assuming your DB field is "difficulty"
    }

    const problems = await Problem.find(filter);

    return res.status(200).json({
      success: true,
      message: "Problem list",
      data: problems
    });
  } catch (err) {
    console.error("Error in getAllProblems:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

export const updateProblem = async (req, res) => {
  const data = req.body;
  console.log("Data:", data);

  const params = req.params;
  console.log("params", params);
  const problem_id = params?.id;

  try {
    const {
      difficulty,
      topic,
      description,
      examples,
      test_case,
      constraints,
      boiler_plate_code
    } = data;

    const existingProblem = await Problem.findById(problem_id);

    const updatedProblem = await Problem.findByIdAndUpdate(
      problem_id,
      {
        difficulty: difficulty ?? existingProblem.difficulty,
        topic: topic ?? existingProblem.topic,
        description: description ?? existingProblem.description,
        examples: examples ?? existingProblem.examples,
        test_case: test_case ?? existingProblem.test_case,
        constraints: constraints ?? existingProblem.constraints,
        boiler_plate_code: boiler_plate_code ?? existingProblem.boiler_plate_code
      },
      { new: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({
        message: "Problem not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      data: updatedProblem
    });

  }
  catch (error) {
    console.log("Error while updating problem:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in Updating Problem"
    });
  }

};

export const deleteProblem = async (req, res) => {
  const params = req.params;
  console.log("params:", params);
  const problem_id = params?.id;

  try {
    const deletedProblem = await Problem.findByIdAndDelete(problem_id);

    if (!deletedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully"
    });
  } catch (error) {
    console.log("Error while deleting problem:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in Deleting Problem"
    });
  }
};
