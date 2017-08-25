"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var assertError_1 = require("jscommons/dist/tests/utils/assertError");
var Locked_1 = require("../../errors/Locked");
var repoFactory_1 = require("../../repoFactory");
// import setup from '../utils/setup';
var service_1 = require("../../service");
var createTestPersona_1 = require("../utils/createTestPersona");
var values_1 = require("../utils/values");
describe('createUpdateIdentifierPersona retry', function () {
    var config; // tslint:disable-line:no-let
    var theService; // tslint:disable-line:no-let
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var repoFacade;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repoFacade = repoFactory_1.default();
                    config = { repo: repoFacade };
                    return [4 /*yield*/, config.repo.clearRepo()];
                case 1:
                    _a.sent();
                    theService = service_1.default(config);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should error aftery trying 3 times and the identifier is locked', function () { return __awaiter(_this, void 0, void 0, function () {
        var persona, resultPromise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTestPersona_1.default()];
                case 1:
                    persona = _a.sent();
                    // Create mock
                    return [4 /*yield*/, config.repo.createIdentifier({
                            ifi: values_1.TEST_IFI,
                            locked: true,
                            organisation: values_1.TEST_ORGANISATION,
                            persona: persona.id,
                        })];
                case 2:
                    // Create mock
                    _a.sent();
                    resultPromise = theService.createUpdateIdentifierPersona({
                        ifi: values_1.TEST_IFI,
                        organisation: values_1.TEST_ORGANISATION,
                        personaName: 'Dave 6',
                    });
                    return [4 /*yield*/, assertError_1.default(Locked_1.default, resultPromise)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should error if unlocked, but persona is not set, (should not be possible in rl)', function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, config.repo.createIdentifier({
                        ifi: values_1.TEST_IFI,
                        organisation: values_1.TEST_ORGANISATION,
                    })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, theService.createUpdateIdentifierPersona({
                            ifi: values_1.TEST_IFI,
                            organisation: values_1.TEST_ORGANISATION,
                            personaName: 'Dave 6',
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    assert.equal(err_1.message, 'Identifier should have a persona');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('should retry twice and succed on 3rd attempt', function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var repoFacade, getIdentifierCount, RETRY_SUCCESS, repoFacadeWithMock, persona, result, personaResult, THREE;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repoFacade = repoFactory_1.default();
                    getIdentifierCount = 0;
                    RETRY_SUCCESS = 2;
                    repoFacadeWithMock = __assign({}, repoFacade, { getIdentifier: function (opts) { return __awaiter(_this, void 0, void 0, function () {
                            var realResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        getIdentifierCount = getIdentifierCount + 1;
                                        return [4 /*yield*/, repoFacade.getIdentifier(opts)];
                                    case 1:
                                        realResult = _a.sent();
                                        return [2 /*return*/, __assign({}, realResult, { locked: getIdentifierCount > RETRY_SUCCESS ? false : true })];
                                }
                            });
                        }); } });
                    config = { repo: repoFacadeWithMock };
                    theService = service_1.default(config);
                    return [4 /*yield*/, theService.createPersona({
                            name: 'Dave',
                            organisation: values_1.TEST_ORGANISATION,
                        })];
                case 1:
                    persona = (_a.sent()).persona;
                    return [4 /*yield*/, config.repo.createIdentifier({
                            ifi: values_1.TEST_IFI,
                            locked: true,
                            organisation: values_1.TEST_ORGANISATION,
                            persona: persona.id,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, theService.createUpdateIdentifierPersona({
                            ifi: values_1.TEST_IFI,
                            organisation: values_1.TEST_ORGANISATION,
                            personaName: 'Dave 6',
                        })];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, theService.getPersona({
                            organisation: values_1.TEST_ORGANISATION,
                            personaId: result.personaId,
                        })];
                case 4:
                    personaResult = (_a.sent()).persona;
                    assert.equal(personaResult.name, 'Dave');
                    THREE = 3;
                    assert.equal(getIdentifierCount, THREE);
                    return [2 /*return*/];
            }
        });
    }); });
}); // tslint:disable-line:max-file-line-count
//# sourceMappingURL=createUpdateIdentifierPersonaRetry.test.js.map