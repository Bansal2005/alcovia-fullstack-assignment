const express = require("express");

const router = express.Router();

const {

    syncData,

    getState

}
=
require(
    "../controllers/syncController"
);

router.post(
    "/sync",
    syncData
);

router.get(
    "/state",
    getState
);

module.exports = router;