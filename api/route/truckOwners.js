const express = require(`express`);
const router = express.Router();
const ownersController = require(`../controller/truckOwners`);
// const app = express();
const jwt = require(`jsonwebtoken`);

function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get(process.env.SECRET),
    function(err, decoded) {
      if (err) {
        res.json({
          status: "error",
          message: err.message,
          data: null,
        });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}

//for Map
router.get(`/allactive`, ownersController.findAllActive);

//For account creation
router.post(`/signup`, ownersController.create);
router.post(`/login`, ownersController.authenticate);

//protected routes
router.put(`/description`, validateUser, ownersController.updateDescription);
router.put(`/active`, validateUser, ownersController.setActive);
router.put(`/inactive`, validateUser, ownersController.setInactive);
router.put(`/newlocation`, validateUser, ownersController.newLocation);
router.get(`/userdata/:id`, validateUser, ownersController.getUser);

module.exports = router;
