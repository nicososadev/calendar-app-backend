const { Router } = require('express')
const { check } = require('express-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { fieldsValidator } = require('../middlewares/fieldsValidator')
const { JWTValidator } = require('../middlewares/tokenValidator')
const { isDate } = require('../helpers/isDate')

const router = Router()

router.use( JWTValidator )


router.get('/', getEvents)

router.post('/', 
    [
        check('title','Title is required').not().isEmpty(),
        check('start','Start Date is required').custom( isDate ),
        check('end','End Date is required').custom( isDate ),
        fieldsValidator
    ],
    createEvent
)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)


module.exports = router