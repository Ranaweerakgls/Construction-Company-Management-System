//ScheduleControllers
const Schedule = require("../Model/ScheduleModel");

// Get all project schedules
const getAllProjectSchedules = async (req, res, next) => {
    let ProjectSchedules;

    try {
        ProjectSchedules = await Schedule.find();
    } catch (err) {
        console.log(err);
    }

    // If no project schedules are found
    if (!ProjectSchedules) {
        return res.status(404).json({ message: "Project not found" });
    }

    // Display all project schedules
    return res.status(200).json({ ProjectSchedules });
};

// Add a new project schedule
const addProjectSchedules = async (req, res, next) => {
    const { Project_Id, Project_Name, Project_Location, Client_Details, Supervisor_Details, Start_Date, End_Date } = req.body;
    console.log(Project_Id)
    let ProjectSchedules;

    try {
        ProjectSchedules = new Schedule({ Project_ID: Project_Id, Project_Name, Project_Location, Client_Details, Supervisor_Details, Start_Date, End_Date });
        await ProjectSchedules.save();
    } catch (err) {
        console.log(err);
    }

    // If unable to add project schedule
    if (!ProjectSchedules) {
        return res.status(404).json({ message: "Unable to add projects" });
    }
    return res.status(200).json({ ProjectSchedules });
};

// Get project schedule by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
console.log(id)
    let ProjectSchedules;

    try {
        ProjectSchedules = await Schedule.find({Project_ID: id});
    } catch (err) {
        console.log(err);
    }

    // If project schedule is not found
    if (!ProjectSchedules) {
        return res.status(404).json({ message: "Project not founds" });
    }

    // Display the project schedule
    return res.status(200).json({ ProjectSchedules });
};

// Update project schedule details
const updateProjectSchedules = async (req, res, next) => {
    const id = req.params.id;
    const { Project_Name, Project_Location, Client_Details, Supervisor_Details, Start_Date, End_Date } = req.body;

    let ProjectSchedules;

    try {
        ProjectSchedules = await Schedule.findByIdAndUpdate(id, {
            Project_Name: Project_Name,
            Project_Location: Project_Location,
            Client_Details: Client_Details,
            Supervisor_Details: Supervisor_Details,
            Start_Date: Start_Date,
            End_Date: End_Date
        });
        ProjectSchedules = await ProjectSchedules.save();
    } catch (err) {
        console.log(err);
    }

    if (!ProjectSchedules) {
        return res.status(404).json({ message: "Unable to Update Project Schedule Details" });
    }
    return res.status(200).json({ ProjectSchedules });
};

//Delete project schedule details

const deleteProjectSchedules = async (req, res, next) => {
    const id = req.params.id;
    let ProjectSchedules;
  
    try {
      ProjectSchedules = await Schedule.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  
    if (!ProjectSchedules) {
      return res.status(404).json({ message: "Unable to Delete Project Schedule Details" });
    }
    return res.status(200).json({ ProjectSchedules });
  };


  const getBypId = async (req, res, next) => {
    const id = req.params.id;

    let ProjectSchedules;

    try {
        ProjectSchedules = await Schedule.findById(id);
    } catch (err) {
        console.log(err);
    }

    // If project schedule is not found
    if (!ProjectSchedules) {
        return res.status(404).json({ message: "Project not founds" });
    }

    // Display the project schedule
    return res.status(200).json({ ProjectSchedules });
};


  const getByProjectId = async (req, res, next) => {
    const projectId = req.params.Project_ID;
  
    try {
      const projectSchedule = await Schedule.findOne({ Project_ID: projectId });
      if (!projectSchedule) {
        return res.status(404).json({ message: "Project schedule not found for Project_ID" });
      }
      return res.status(200).json({ projectSchedule });
    } catch (err) {
      console.error("Error fetching schedule by Project_ID:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  
// Export all functions
exports.getAllProjectSchedules = getAllProjectSchedules;
exports.addProjectSchedules = addProjectSchedules;
exports.getById = getById;
exports.updateProjectSchedules = updateProjectSchedules;
exports.deleteProjectSchedules = deleteProjectSchedules;
exports.getBypId = getBypId;
exports.getByProjectId = getByProjectId;



