const mongoose = require("mongoose");
const express = require("express");
const isAuthenticated = require("../middleware/auth.js");
const router = express.Router();
router.use(isAuthenticated);

// List Model
let listSchema = require("../models/List");

// CREATE List
router.route("/create-list").post((req, res, next) => {
  listSchema.create({ ...req.body, userId: req.user._id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// READ Lists
router.route("/").get((req, res, next) => {
  listSchema.find({ userId: req.user._id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});

// Get Single List
router.route("/edit-list/:id").get((req, res, next) => {
  listSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update List
router.route("/update-list/:id").put((req, res, next) => {
  listSchema.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Add Cards
router.route("/update-list/:id/card").post((req, res, next) => {
  listSchema.findByIdAndUpdate(
    req.params.id,
    {
      $push: { cards: req.body },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Update Card
router.route("/update-list/:id/card/:index").put((req, res, next) => {
  listSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        [`cards.${req.params.index}`]: req.body,
      },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Delete List
router.route("/delete-list/:id").delete((req, res, next) => {
  listSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      console.log("eror deleting");
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
