"use strict";
/* global joint */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CustomRect = /** @class */ (function (_super) {
    __extends(CustomRect, _super);
    //custom shape declaration
    function CustomRect() {
        return _super.call(this) || this;
        // TODO: extend class
        //also deepsupplement is apparently deprecated
    }
    return CustomRect;
}(joint.shapes.basic.Generic));
var Argument = /** @class */ (function () {
    function Argument(config) {
        // not used
        this.position = {
            x: config.x,
            y: config.y,
        };
        //creates a string of text, attempting to fit as many characters as possible
        //into a line of size width, before separating with newline character and repeating
        var text_wrap = joint.util.breakText(" a lot of text a lot of text a lot of text a lot of text a lot of text a lot of text a lot of text", { width: 90 });
        // regular expression to find number of lines in text_wrap
        // searching for all instances (g-> global) of \n in text_wrap string
        // if none are found, instead of attempting to read .length of undefined,
        //an empty array of .length. 0 is returned.
        var count = (text_wrap.match(/\n/g) || []).length;
        console.log(count);
        //custom rect configuration
        this.rect = {
            position: {
                x: config.x,
                y: config.y,
            },
            size: {
                width: 100,
                height: 13 * (count + 1),
            },
            attrs: {
                rect: {
                    fill: config.body_color,
                },
                text: {
                    text: text_wrap,
                    fill: config.text_color,
                },
            },
            // set custom attributes here:
            link_color: config.link_color,
            weight: config.weight,
            type: config.type,
        };
        console.log(this.rect);
    }
    return Argument;
}());
