const userModel = require(`../model/users`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

module.exports = {
  create: function(req, res, next) {
    userModel
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        socketId: "",
      })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  authenticate: function(req, res, next) {
    userModel.findOne({ email: req.body.email }, function(err, userInfo) {
      if (err) {
        next(err);
        res.json({ status: `error`, message: `Invalid email`, data: null });
      } else {
        console.log(req.body.password);
        console.log(userInfo.password);
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get(process.env.SECRET)
          );
          res.json({
            status: `success`,
            message: `user found`,
            data: { user: userInfo, token: token },
          });
        } else {
          res.json({
            status: `error`,
            message: `Invalid email/password`,
            data: null,
          });
        }
      }
    });
  },

  findAll: function(req, res, next) {
    userModel.find({}, { name: 1, socketId: 1 }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: `success`,
          message: `got users`,
          data: { users: userInfo },
        });
      }
    });
  },
  deleteOwner: function(req, res) {
    userModel
      .deleteOne({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  newLocation: function(req, res) {
    console.log(req.body);
    userModel
      .update(
        { _id: req.params.id },
        {
          $push: {
            // pushing location from req.body into the location array
            // $position 0 puts new location to 1st spot in the index
            location: { $each: [req.body], $position: 0 },
          },
        }
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateInformation: function(req, res) {
    console.log(req.body);
    userModel
      .updateOne({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  currentLocation: function(req, res) {
    userModel
      .find({ _id: req.params.id }, { location: { $slice: 1 } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByType: function(req, res) {
    userModel
      .find({ foodType: req.params.foodtype })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  trucksActive: function(req, res) {
    userModel
      .updateOne({ _id: req.params.id }, { truckActive: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  trucksInactive: function(req, res) {
    userModel
      .updateOne({ _id: req.params.id }, { truckActive: false })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findActive: function(req, res) {
    userModel
      .find({ truckActive: true }, { location: { $slice: 1 } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
