const express = require(`express`);
const router = express.Router();
const ownerRoutes = require(`./truckOwners`);

router.use(`/api/owner`, ownerRoutes);

module.exports = router;
