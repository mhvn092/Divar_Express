"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var got_1 = require("got");
var express_1 = require("express");
var Joi = require("joi");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
var p = '';
var models = [];
var uns = [];
var globTime = 300000;
app.get("/", function (req, res) {
    res.send("<b>hello world</b>");
});
app.get("/api/mashhad", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, json, main, main2, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, got_1["default"])("https://api.divar.ir/v8/web-search/mashhad/")];
            case 1:
                response = _a.sent();
                json = JSON.parse(response.body);
                main = json.schema.ui_schema.category.urischema.display;
                main2 = Object.keys(main);
                res.send("<b>Please Choose Your Category and enter in the url</b><br>" + main2);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/api/mashhad/:name", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, json, main, main2, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, got_1["default"])("https://api.divar.ir/v8/web-search/mashhad/".concat(req.params.name))];
            case 1:
                response = _a.sent();
                if (!response) {
                    res.status(404).send('no such category');
                }
                else {
                    json = JSON.parse(response.body);
                    main = json.schema.json_schema.properties;
                    if (main.brand_model) {
                        main2 = main.brand_model.properties.value.items["enum"];
                        res.send("<b>Please Choose Your Specific Brand and eneter in the url</b><br>" + main2);
                    }
                    else {
                        res.send("<b>Your Chooosen Category Does Not Have Specific models, for a Beautified api, please enter your category in format like this to start getting your ads</b><br>"
                            + "/api/mashhad/un/".concat(req.params.name));
                    }
                }
                ;
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/api/mashhad/:name/:name2", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, json, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, got_1["default"])("https://api.divar.ir/v8/web-search/mashhad/".concat(req.params.name, "/").concat(req.params.name2))];
            case 1:
                response = _a.sent();
                if (!response) {
                    res.status(404).send('no such product');
                }
                else {
                    json = JSON.parse(response.body);
                    json.widget_list.forEach(function (_item) {
                        p += "<div> <h1>title: ".concat(_item.data.title, "</h1> <img src='").concat(_item.data.image, "'><h4>description: ").concat(_item.data.description, "</h4> </div>");
                        models.push(_item.data);
                    });
                    res.send(p);
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/api/mashhad/:name/:name2/:id", function (req, res) {
    var model = models.find(function (x) { return x.id === parseInt(req.params.id); });
    if (!model) {
        res.status(404).send('');
    }
    res.send(model);
});
app.get("/api/mashhad/un/:name3/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, json, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, got_1["default"])("https://api.divar.ir/v8/web-search/mashhad/".concat(req.params.name3, "/}"))];
            case 1:
                response = _a.sent();
                if (!response) {
                    res.status(404).send('no such category');
                }
                else {
                    json = JSON.parse(response.body);
                    json.widget_list.forEach(function (_item) {
                        p += "<div> <h1>title: ".concat(_item.data.title, "</h1> <img src='").concat(_item.data.image, "'><h4>description: ").concat(_item.data.description, "</h4> </div>");
                        uns.push(_item.data);
                    });
                    res.send(uns);
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/api/mashhad/un/:name3/:id", function (req, res) {
    var un = uns.find(function (x) { return x.index === parseInt(req.params.id); });
    if (!un) {
        res.status(404).send('');
    }
    res.send(un);
});
app.put("/api/mashhad/:name/:name2/", function (req, res) {
    var schema = Joi.object({
        time: Joi.number().min(5).required()
    });
    var result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    globTime = req.body.time;
    res.send({
        "time": "".concat(globTime)
    });
});
app.put("/api/mashhad/un/:name3/", function (req, res) {
    var schema = Joi.object({
        time: Joi.number().min(5).required()
    });
    var result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    globTime = req.body.time;
    res.send({
        "time": "".concat(globTime)
    });
});
app.post('/api/mashhad/:name/:name2', function (req, res) {
    var schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    var result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    var model = {
        id: models.length + 1,
        name: req.body.name
    };
    var mod = models.find(function (item) { return item.name === model.name; });
    if (mod) {
        return res.status(404).send('we had this category. id is : ' + mod.id);
    }
    models.push(model);
    res.send(model);
});
app.post('/api/mashhad/un/:name3/', function (req, res) {
    var schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    var result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    var uni = {
        id: uns.length + 1,
        name: req.body.name
    };
    var unig = uns.find(function (item) { return item.name === uni.name; });
    if (unig) {
        return res.status(404).send('we had this category. id is : ' + uni.id);
    }
    models.push(uni);
    res.send(uni);
});
app["delete"]('api/mashhad/un/:name3/:id', function (req, res) {
    var un = uns.find(function (x) { return x.id === parseInt(req.params.id); });
    if (!un) {
        res.status(404).send('');
    }
    var index = uns.indexOf(un);
    models.splice(index);
    res.send(un);
});
app["delete"]('/api/mashhad/:name/:name2/:id', function (req, res) {
    var model = models.find(function (x) { return x.id === parseInt(req.params.id); });
    if (!model) {
        res.status(404).send('');
    }
    if (model) {
        var index = models.indexOf(model);
        models.splice(index);
    }
    res.send(model);
});
var port = 3000;
app.listen(port, function () {
    console.log("Start listening on port ".concat(port));
});
