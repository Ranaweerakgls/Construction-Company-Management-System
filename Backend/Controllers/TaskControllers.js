//controller
const Task = require("../Model/TaskModel");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: 1 }); // Ascending order
        return res.status(200).json({ 
            success: true,
            count: tasks.length,
            tasks 
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Server error",
            error: err.message 
        });
    }
};

const addTask = async (req, res) => {
    try {
        const requiredFields = [
            'Project_ID', 'Project_Manager_ID', 'PM_Name',
             'Worker_ID', 'Deadline','Priority_Level','Task_Status','Description'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                missingFields
            });
        }

        const task = new Task(req.body);
        await task.save();

        return res.status(201).json({ 
            success: true,
            message: "Task created successfully",
            task 
        });

    } catch (err) {
        console.error(err);
        
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        if (err.code === 11000) {
          const field = Object.keys(err.keyPattern)[0]; // Extract duplicate field name
          return res.status(400).json({
              success: false,
              message: ` Duplicate key error: ${field} must be unique`,
              error: ` A record with this ${field} already exists`
          });
      }

        return res.status(500).json({
            success: false,
            message: "Unable to add task",
            error: err.message
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: "Task not found" 
            });
        }

        return res.status(200).json({ 
            success: true,
            task 
        });

    } catch (err) {
        console.error(err);
        
        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID format"
            });
        }

        return res.status(500).json({ 
            success: false,
            message: "Server error",
            error: err.message 
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: "Task not found" 
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Task updated successfully",
            task 
        });

    } catch (err) {
        console.error(err);
        
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed during update",
                errors
            });
        }

        return res.status(500).json({ 
            success: false,
            message: "Unable to update task",
            error: err.message 
        });
    }
};

const updateTaskStatus = async(req, res) => {
    try {
        const { taskId } = req.params; // <-- this gets the value from the URL
        if (!taskId) {
            return res.status(404).json({ 
                success: false,
                message: "taskId not found" 
            });
            
        }

        const {Task_Status} = req.body
        if (!Task_Status) {
            return res.status(404).json({ 
                success: false,
                message: "Task_Status not found" 
            });
            
        }

        const task = await Task.findByIdAndUpdate(
            taskId,
            {Task_Status},
            { 
                new: true,
                runValidators: true 
            }
        );

    } catch (err) {
        console.error(err);
        
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed during update",
                errors
            });
        }

        return res.status(500).json({ 
            success: false,
            message: "Unable to update task",
            error: err.message 
        });
    }
}
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: "Task not found" 
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Task deleted successfully" 
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            success: false,
            message: "Server error",
            error: err.message 
        });
    }

  
};

const getTasksByWorkerId = async (req, res) => {
    try {
        const { workerId } = req.params;
        if (!workerId) {
            return res.status(400).json({
                success: false,
                message: "Worker_ID is required"
            });
        }
        const tasks = await Task.find({ Worker_ID: workerId }).sort({ createdAt: 1 });
        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

module.exports = {
    getAllTasks,
    addTask,
    getTaskById,
    updateTask,
    deleteTask, 
    getTasksByWorkerId, 
    updateTaskStatus,
    getTasksByWorkerId
};