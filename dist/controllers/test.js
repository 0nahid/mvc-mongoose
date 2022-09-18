"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const getAllTest = (req, res) => {
    res.send({ message: "getAllTest", status: 200 });
};
const createTest = (req, res) => {
    res.send({
        message: "createTest",
        status: 200,
        body: req.body,
    });
};
exports.testRouter = { getAllTest, createTest };
