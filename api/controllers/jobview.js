const express = require("express");
const router = express.Router();
const usersModal = require("../mongodb_scheme/users");
const productionModal = require("../mongodb_scheme/production")
const errorlogsModal = require("../mongodb_scheme/error_log")

router.get("/get_users", async(req, res) => {
    try{
        const users = await usersModal.find();
        return res.json({users: users});
    }
    catch(error)
    {
        console.log(error);
    }

});

router.get("/get_production", async(req, res) => {
    try{
        const production = await productionModal.find();
        return res.json({production: production});
    }
    catch(error)
    {
        console.log(error);
    }
});

router.get("/get_errorlogs", async(req, res) => {
    try{
        const errorlogs = await errorlogsModal.find();
        return res.json({errorlogs: errorlogs});
    }
    catch(error)
    {
        console.log(error);
    }
});

module.exports = router;
