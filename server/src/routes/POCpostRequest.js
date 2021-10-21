var express = require('express');
var router = express.Router();

/* POST test route. */
router.post('/test', function(req, res) {
    /* do thing with requested parameters */
    console.log("MESSAGE = " + req.body.msg);
    /* send answer with status code 500 and sending 
    the msg variable of the jsonI received */
    res.status(500).json({msg: req.body.msg});
})
  
module.exports = router;