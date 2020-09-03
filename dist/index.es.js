import { Router as Router$1 } from 'express';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var chatRequset = function (sessionClient, data) { return __awaiter(void 0, void 0, void 0, function () {
    var text, languageCode, sessionPath, request, responses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                text = data.text, languageCode = data.languageCode, sessionPath = data.sessionPath;
                request = {
                    session: sessionPath,
                    queryInput: {
                        text: {
                            text: text,
                            languageCode: languageCode,
                        },
                    },
                };
                return [4 /*yield*/, sessionClient.detectIntent(request)];
            case 1:
                responses = _a.sent();
                return [2 /*return*/, responses];
        }
    });
}); };

var chatEvent = function (sessionClient, data) { return __awaiter(void 0, void 0, void 0, function () {
    var eventName, sessionPath, languageCode, request, responses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventName = data.eventName, sessionPath = data.sessionPath, languageCode = data.languageCode;
                request = {
                    session: sessionPath,
                    queryInput: {
                        event: {
                            name: eventName,
                            languageCode: languageCode,
                        },
                    },
                };
                return [4 /*yield*/, sessionClient.detectIntent(request)];
            case 1:
                responses = _a.sent();
                return [2 /*return*/, responses];
        }
    });
}); };

var dialogflow = require('dialogflow');
var Router = Router$1;
var ckDialogflowWebhook = function (keyFilename) {
    var sessionClient = new dialogflow.v2.SessionsClient({ keyFilename: keyFilename });
    var router = Router();
    router.post('/ckWebhook/dialogFLow/chatInit', function (req, res) {
        var _a = req.body.data, sessionId = _a.sessionId, projectId = _a.projectId;
        try {
            var sessionPath = sessionClient.sessionPath(projectId, sessionId);
            var result = {
                sessionPath: sessionPath,
            };
            res.json({ result: result });
        }
        catch (err) {
            console.log(err);
        }
    });
    router.post('/ckWebhook/dialogFLow/chatRequest', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    data = req.body.data;
                    return [4 /*yield*/, chatRequset(sessionClient, data)];
                case 1:
                    result = _a.sent();
                    res.json({ result: result });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    router.post('/ckWebhook/dialogFLow/chatEvent', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    data = req.body.data;
                    return [4 /*yield*/, chatEvent(sessionClient, data)];
                case 1:
                    result = _a.sent();
                    res.json({ result: result });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    return router;
};

export default ckDialogflowWebhook;
//# sourceMappingURL=index.es.js.map
