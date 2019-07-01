const ownersModel = require(`../model/truckOwners`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

module.exports = {
  create: function(req, res, next) {
    ownersModel
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description,
      })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },

  authenticate: function(req, res, next) {
    ownersModel.findOne({ email: req.body.email }, function(err, userInfo) {
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
  getUser: function(req, res, next) {
    console.log(req.params.id);
    ownersModel
      .findOne({
        _id: req.params.id,
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateDescription: function(req, res, next) {
    ownersModel
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: { description: req.body.description },
        }
      )
      .then(newDescription => res.json(newDescription))
      .catch(err => res.status(422).json(err));
  },
  setActive: function(req, res, next) {
    ownersModel
      .findOneAndUpdate(
        {
          _id: req.body.id,
        },
        {
          $set: { active: true },
        }
      )
      .then(truckActive => res.json(truckActive))
      .catch(err => res.status(422).json(err));
  },
  setInactive: function(req, res, next) {
    ownersModel
      .findOneAndUpdate(
        {
          _id: req.body.id,
        },
        {
          $set: { active: false },
        }
      )
      .then(truckInactive => res.json(truckInactive))
      .catch(err => res.status(422).json(err));
  },

  findAllActive: function(req, res, next) {
    ownersModel
      .find({ active: true }, { location: { $slice: 1 } })
      .then(activeTrucks => res.json(activeTrucks))
      .catch(err => res.status(422).json(err));
  },

  // setActive: function(req, res) {
  //   db.Owners.updateOne({ _id: req.params.id }, { truckActive: true })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // trucksInactive: function(req, res) {
  //   db.Owners.updateOne({ _id: req.params.id }, { truckActive: false })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // findActive: function(req, res) {
  //   db.Owners.find({ truckActive: true }, { location: { $slice: 1 } })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
};
