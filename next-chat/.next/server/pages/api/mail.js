"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/mail";
exports.ids = ["pages/api/mail"];
exports.modules = {

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "(api)/./pages/api/mail.js":
/*!***************************!*\
  !*** ./pages/api/mail.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(req, res) {\n    const nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n    const transporter = nodemailer.createTransport({\n        port: 465,\n        host: \"smtp.gmail.com\",\n        secure: \"true\",\n        auth: {\n            user: \"shalomgoodman8@gmail.com\",\n            pass: \"yjeudbefnqlthlrt\"\n        }\n    });\n    const mailData = {\n        from: \"Chat API\",\n        to: req.body.email,\n        subject: `Verify your email`,\n        text: req.body.message\n    };\n    transporter.sendMail(mailData, function(err, info) {\n        if (err) {\n            console.log(err);\n            return res.status(500).json({\n                message: `an error occurred ${err}`\n            });\n        }\n        res.status(200).json({\n            message: info\n        });\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbWFpbC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkJBQWUsb0NBQVVBLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQ2pDLE1BQU1DLFVBQVUsR0FBR0MsbUJBQU8sQ0FBQyw4QkFBWSxDQUFDO0lBRXhDLE1BQU1DLFdBQVcsR0FBR0YsVUFBVSxDQUFDRyxlQUFlLENBQUM7UUFDN0NDLElBQUksRUFBRSxHQUFHO1FBQ1RDLElBQUksRUFBRSxnQkFBZ0I7UUFDdEJDLE1BQU0sRUFBRSxNQUFNO1FBQ2RDLElBQUksRUFBRTtZQUNKQyxJQUFJLEVBQUUsMEJBQTBCO1lBQ2hDQyxJQUFJLEVBQUUsa0JBQWtCO1NBQ3pCO0tBQ0YsQ0FBQztJQUVGLE1BQU1DLFFBQVEsR0FBRztRQUNmQyxJQUFJLEVBQUUsVUFBVTtRQUNoQkMsRUFBRSxFQUFFZCxHQUFHLENBQUNlLElBQUksQ0FBQ0MsS0FBSztRQUNsQkMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7UUFDNUJDLElBQUksRUFBRWxCLEdBQUcsQ0FBQ2UsSUFBSSxDQUFDSSxPQUFPO0tBQ3ZCO0lBQ0RmLFdBQVcsQ0FBQ2dCLFFBQVEsQ0FBQ1IsUUFBUSxFQUFFLFNBQVVTLEdBQUcsRUFBRUMsSUFBSSxFQUFFO1FBQ2xELElBQUlELEdBQUcsRUFBRTtZQUNQRSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0gsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBT3BCLEdBQUcsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFUCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRUUsR0FBRyxDQUFDLENBQUM7YUFBRSxDQUFDLENBQUM7U0FDdEU7UUFDRHBCLEdBQUcsQ0FBQ3dCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVQLE9BQU8sRUFBRUcsSUFBSTtTQUFFLENBQUMsQ0FBQztLQUN6QyxDQUFDLENBQUM7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtY2hhdC8uL3BhZ2VzL2FwaS9tYWlsLmpzPzdkMTQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gIGNvbnN0IG5vZGVtYWlsZXIgPSByZXF1aXJlKFwibm9kZW1haWxlclwiKTtcblxuICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICBwb3J0OiA0NjUsXG4gICAgaG9zdDogXCJzbXRwLmdtYWlsLmNvbVwiLFxuICAgIHNlY3VyZTogXCJ0cnVlXCIsXG4gICAgYXV0aDoge1xuICAgICAgdXNlcjogXCJzaGFsb21nb29kbWFuOEBnbWFpbC5jb21cIixcbiAgICAgIHBhc3M6IFwieWpldWRiZWZucWx0aGxydFwiLFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IG1haWxEYXRhID0ge1xuICAgIGZyb206IFwiQ2hhdCBBUElcIixcbiAgICB0bzogcmVxLmJvZHkuZW1haWwsXG4gICAgc3ViamVjdDogYFZlcmlmeSB5b3VyIGVtYWlsYCxcbiAgICB0ZXh0OiByZXEuYm9keS5tZXNzYWdlLFxuICB9O1xuICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsRGF0YSwgZnVuY3Rpb24gKGVyciwgaW5mbykge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBgYW4gZXJyb3Igb2NjdXJyZWQgJHtlcnJ9YCB9KTtcbiAgICB9XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiBpbmZvIH0pO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJyZXEiLCJyZXMiLCJub2RlbWFpbGVyIiwicmVxdWlyZSIsInRyYW5zcG9ydGVyIiwiY3JlYXRlVHJhbnNwb3J0IiwicG9ydCIsImhvc3QiLCJzZWN1cmUiLCJhdXRoIiwidXNlciIsInBhc3MiLCJtYWlsRGF0YSIsImZyb20iLCJ0byIsImJvZHkiLCJlbWFpbCIsInN1YmplY3QiLCJ0ZXh0IiwibWVzc2FnZSIsInNlbmRNYWlsIiwiZXJyIiwiaW5mbyIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXMiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/mail.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/mail.js"));
module.exports = __webpack_exports__;

})();