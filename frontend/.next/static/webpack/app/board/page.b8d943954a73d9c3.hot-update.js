"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/board/page",{

/***/ "(app-client)/./src/app/board/page.js":
/*!*******************************!*\
  !*** ./src/app/board/page.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Board; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _routes_MapComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/routes/MapComponent */ \"(app-client)/./src/routes/MapComponent.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Board() {\n    _s();\n    let [dice, setDice] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0); // 주사위\n    let [pin, setPin] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0); // 현재 위치\n    let [lab, setLab] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0); // 바퀴 수\n    let road = [\n        0,\n        1,\n        2,\n        3,\n        4,\n        5,\n        6,\n        7,\n        8,\n        9,\n        10,\n        11,\n        12,\n        13,\n        14,\n        15,\n        16,\n        17,\n        18,\n        19,\n        20,\n        21,\n        22,\n        23,\n        24\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"보드게임 화면\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\A602\\\\frontend\\\\src\\\\app\\\\board\\\\page.js\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: ()=>{\n                    let num = 6;\n                    let dice = parseInt(Math.random() * num + 1); // 랜덤으로 주사위 숫자 추출\n                    console.log(dice);\n                    setDice(dice); // 말 수 변경\n                    // 한 바퀴 돌 때마다 pin 갱신\n                    {\n                        pin + dice <= 24 ? setPin(pin + dice) : setPin(pin + dice - 24);\n                    }\n                    // 한 바퀴 돌 때마다 lab state 변경\n                    {\n                        pin + dice <= 24 ? null : setLab(lab + 1);\n                    }\n                    console.log(pin);\n                },\n                children: \"주사위 굴리기\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\A602\\\\frontend\\\\src\\\\app\\\\board\\\\page.js\",\n                lineNumber: 15,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    \"주사위 눈은 \",\n                    dice,\n                    \"가 나왔습니다.\"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\A602\\\\frontend\\\\src\\\\app\\\\board\\\\page.js\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    dice,\n                    \"칸 이동하여 현재 \",\n                    pin,\n                    \"번 블록에 있습니다.\"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\A602\\\\frontend\\\\src\\\\app\\\\board\\\\page.js\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    lab,\n                    \"바퀴 돌았습니다.\"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\A602\\\\frontend\\\\src\\\\app\\\\board\\\\page.js\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\A602\\\\frontend\\\\src\\\\app\\\\board\\\\page.js\",\n        lineNumber: 13,\n        columnNumber: 5\n    }, this);\n}\n_s(Board, \"I6R8ZxjqUybTd8VZBIxRHzwZH84=\");\n_c = Board;\nvar _c;\n$RefreshReg$(_c, \"Board\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vc3JjL2FwcC9ib2FyZC9wYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDaUQ7QUFDaEI7QUFFbEIsU0FBU0U7O0lBRXRCLElBQUksQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHSCwrQ0FBUUEsQ0FBQyxJQUFJLE1BQU07SUFDekMsSUFBSSxDQUFDSSxLQUFLQyxPQUFPLEdBQUdMLCtDQUFRQSxDQUFDLElBQUksUUFBUTtJQUN6QyxJQUFJLENBQUNNLEtBQUtDLE9BQU8sR0FBR1AsK0NBQVFBLENBQUMsSUFBSSxPQUFPO0lBQ3hDLElBQUlRLE9BQU87UUFBQztRQUFHO1FBQUc7UUFBRztRQUFHO1FBQUc7UUFBRztRQUFHO1FBQUc7UUFBRztRQUFHO1FBQUk7UUFBSTtRQUFJO1FBQUk7UUFBSTtRQUFJO1FBQUk7UUFBSTtRQUFJO1FBQUk7UUFBSTtRQUFJO1FBQUk7UUFBSTtLQUFHO0lBRXJHLHFCQUNFLDhEQUFDQzs7MEJBQ0MsOERBQUNDOzBCQUFHOzs7Ozs7MEJBQ0osOERBQUNDO2dCQUFPQyxTQUFTO29CQUNmLElBQUlDLE1BQU07b0JBQ1YsSUFBSVgsT0FBT1ksU0FBU0MsS0FBS0MsTUFBTSxLQUFLSCxNQUFNLElBQUksaUJBQWlCO29CQUMvREksUUFBUUMsR0FBRyxDQUFDaEI7b0JBQ1pDLFFBQVFELE9BQU8sU0FBUztvQkFFeEIsb0JBQW9CO29CQUNwQjt3QkFDRUUsTUFBSUYsUUFBUSxLQUVWRyxPQUFPRCxNQUFJRixRQUVYRyxPQUFPRCxNQUFJRixPQUFLO29CQUNwQjtvQkFFQSwwQkFBMEI7b0JBQzFCO3dCQUNFRSxNQUFJRixRQUFRLEtBRVYsT0FFQUssT0FBT0QsTUFBSTtvQkFDZjtvQkFFQVcsUUFBUUMsR0FBRyxDQUFDZDtnQkFDZDswQkFBRzs7Ozs7OzBCQUNILDhEQUFDSzs7b0JBQUk7b0JBQ01QO29CQUFNOzs7Ozs7OzBCQUVqQiw4REFBQ087O29CQUNHUDtvQkFBTTtvQkFBWUU7b0JBQUs7Ozs7Ozs7MEJBRTNCLDhEQUFDSzs7b0JBQ0dIO29CQUFLOzs7Ozs7Ozs7Ozs7O0FBS2Y7R0FoRHdCTDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2JvYXJkL3BhZ2UuanM/OTM4OCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxyXG5pbXBvcnQgTWFwQ29tcG9uZW50IGZyb20gJ0Avcm91dGVzL01hcENvbXBvbmVudCc7XHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQm9hcmQoKSB7XHJcblxyXG4gIGxldCBbZGljZSwgc2V0RGljZV0gPSB1c2VTdGF0ZSgwKTsgLy8g7KO87IKs7JyEXHJcbiAgbGV0IFtwaW4sIHNldFBpbl0gPSB1c2VTdGF0ZSgwKTsgLy8g7ZiE7J6sIOychOy5mFxyXG4gIGxldCBbbGFiLCBzZXRMYWJdID0gdXNlU3RhdGUoMCk7IC8vIOuwlO2AtCDsiJhcclxuICBsZXQgcm9hZCA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0XTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxoMT7rs7Trk5zqsozsnoQg7ZmU66m0PC9oMT5cclxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgIGxldCBudW0gPSA2O1xyXG4gICAgICAgIGxldCBkaWNlID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIG51bSArIDEpOyAvLyDrnpzrjaTsnLzroZwg7KO87IKs7JyEIOyIq+yekCDstpTstpxcclxuICAgICAgICBjb25zb2xlLmxvZyhkaWNlKTtcclxuICAgICAgICBzZXREaWNlKGRpY2UpOyAvLyDrp5Ag7IiYIOuzgOqyvVxyXG5cclxuICAgICAgICAvLyDtlZwg67CU7YC0IOuPjCDrlYzrp4jri6QgcGluIOqwseyLoFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBpbitkaWNlIDw9IDI0XHJcbiAgICAgICAgICA/IChcclxuICAgICAgICAgICAgc2V0UGluKHBpbitkaWNlKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgOiBzZXRQaW4ocGluK2RpY2UtMjQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g7ZWcIOuwlO2AtCDrj4wg65WM66eI64ukIGxhYiBzdGF0ZSDrs4Dqsr1cclxuICAgICAgICB7XHJcbiAgICAgICAgICBwaW4rZGljZSA8PSAyNFxyXG4gICAgICAgICAgPyAoXHJcbiAgICAgICAgICAgIG51bGxcclxuICAgICAgICAgIClcclxuICAgICAgICAgIDogc2V0TGFiKGxhYisxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHBpbilcclxuICAgICAgfX0+7KO87IKs7JyEIOq1tOumrOq4sDwvYnV0dG9uPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIOyjvOyCrOychCDriIjsnYAgeyBkaWNlIH3qsIAg64KY7JmU7Iq164uI64ukLlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdj5cclxuICAgICAgICB7IGRpY2Ugfey5uCDsnbTrj5ntlZjsl6wg7ZiE7J6sIHsgcGluIH3rsogg67iU66Gd7JeQIOyeiOyKteuLiOuLpC5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgeyBsYWIgfeuwlO2AtCDrj4zslZjsirXri4jri6QuXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG4iXSwibmFtZXMiOlsiTWFwQ29tcG9uZW50IiwidXNlU3RhdGUiLCJCb2FyZCIsImRpY2UiLCJzZXREaWNlIiwicGluIiwic2V0UGluIiwibGFiIiwic2V0TGFiIiwicm9hZCIsImRpdiIsImgxIiwiYnV0dG9uIiwib25DbGljayIsIm51bSIsInBhcnNlSW50IiwiTWF0aCIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./src/app/board/page.js\n"));

/***/ })

});