"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_1 = require("../../controllers/test");
const router = (0, express_1.Router)();
// @route  get api/v1/test
router.route("/").get(test_1.testRouter.getAllTest).post(test_1.testRouter.createTest);
exports.default = router;
