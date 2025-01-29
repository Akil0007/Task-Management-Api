const Task = require("../models/Task.Model");

exports.createTask = async (req, res, next) => {
  try {
    const { name, desc, startDate, endDate, status } = req.body;
    console.log("req.user", req.user);
    const { id } = req.user;

    const isExistTask = await Task.findOne({ name, user: id });
    if (isExistTask) {
      return res
        .status(409)
        .json({ message: "Task already exists for this user" });
    }

    const task = await Task.create({
      name,
      desc,
      startDate,
      endDate,
      status,
      user: id,
    });
    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, status, search } = req.query;
    const { id: userId } = req.user;
    const filter = { user: userId };
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTasks = await Task.countDocuments(filter);

    // check if no tasks are found
    // if (!tasks.length) {
    //   return res.status(404).json({
    //     message: "No tasks found for the provided criteria",
    //   });
    // }

    return res.status(200).json({
      tasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: parseInt(page),
      totalTasks,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { name, desc, startDate, endDate, status } = req.body;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "endDate must be after startDate" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { name, desc, startDate, endDate, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
