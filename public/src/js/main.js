"use strict";
/* global joint */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paper = exports.graph = void 0;
// this is built on Joint.js, an open source library. It handles a lot of the
// fundamental pieces for us on the back end, we have to implement the front end / interface
// to interact with it
var jointjs_1 = __importDefault(require("jointjs"));
exports.graph = new jointjs_1.default.dia.Graph();
// the paper renders the image of the graph
exports.paper = new jointjs_1.default.dia.Paper({
    el: document.getElementById("myholder"),
    model: exports.graph,
    gridSize: 1,
});
