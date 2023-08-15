const asyncHandler = require('express-async-handler')

// @desc  Get Goals
// @route Get /api/goals
// @access Public
const getGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("please add text field")
    }
    res.status(200).json({ message: "get goals" });
})


// @desc  Post Goals
// @route Post /api/goals
// @access Public
const setGoal = asyncHandler(async (req, res) => {

    res.status(200).json({ message: "set goals" });
})


// @desc  Put Goals
// @route Put /api/goals/:id
// @access Public
const updateGoal = asyncHandler(async (req, res) => {
    const goalId = req.params.id;
    res.status(200).json({ message: `update goal ${goalId}` });
})


// @desc  Delete Goals
// @route Delete /api/goals/:id
// @access Public
const deleteGoal = asyncHandler(async (req, res) => {
    const goalId = req.params.id;
    res.status(200).json({ message: `delete the id ${goalId}` });
})



module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
