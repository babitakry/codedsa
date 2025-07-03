import { Problem } from "../models/problem.models.js";

export const createProblem = async (req, res) => {
    const data = req.body;

    try {
        const {
            title,
            difficulty,
            topic,
            description,
            constraints,
            examples,
            test_case,
            boiler_plate_code
        } = req.body;


        if (!title || !difficulty || !topic || !description || !constraints || !examples || !test_case || !boiler_plate_code) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const check_title =await Problem.findOne({title: title});

        if(check_title){
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
      const problems = await Problem.find({});
      return res.status(200).json({
        success: true,
        message: `Problem list`,
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