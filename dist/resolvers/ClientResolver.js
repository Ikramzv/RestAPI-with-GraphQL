"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const clientSchema_1 = __importDefault(require("../mongoSchemas/clientSchema"));
const projectSchema_1 = __importDefault(require("../mongoSchemas/projectSchema"));
const ClientType_1 = __importDefault(require("../Objects/ClientType"));
let ClientInput = class ClientInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ClientInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ClientInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ClientInput.prototype, "phone", void 0);
ClientInput = __decorate([
    (0, type_graphql_1.InputType)()
], ClientInput);
let ClientResolver = class ClientResolver {
    client(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield clientSchema_1.default.findById(id);
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    clients() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield clientSchema_1.default.find();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createClient(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield clientSchema_1.default.create(options);
                yield data.save();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield clientSchema_1.default.findByIdAndDelete(id);
                const projects = yield projectSchema_1.default.find({ clientId: id });
                if (projects.length > 0) {
                    yield Promise.all(projects.map((project) => {
                        return project.deleteOne();
                    }));
                }
                return data ? true : false;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => ClientType_1.default),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "client", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ClientType_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "clients", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ClientType_1.default),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClientInput]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "createClient", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "deleteClient", null);
ClientResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ClientResolver);
exports.default = ClientResolver;
