const express = require('express')
const router = express.Router()
const {getMyTasks,getAllTasks, createTasks, updateTasks, deleteTasks} = require('../controller/tasksController')
const {protect, authorize} = require('../middleware/auth')


router.get('/me', protect, getMyTasks)
router.post('/',protect, createTasks)
router.get('/', protect, authorize(["admin"]), getAllTasks)
router.put('/:id', updateTasks)
router.delete('/:id', deleteTasks)

module.exports = router;