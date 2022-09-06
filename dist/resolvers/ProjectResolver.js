"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const ProjectType_1 = __importStar(require("../Objects/ProjectType"));
let ProjectInput = class ProjectInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ProjectInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ProjectInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: 'Not Started' }),
    __metadata("design:type", String)
], ProjectInput.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: '63165267d5b85837e7b93298' }),
    __metadata("design:type", String)
], ProjectInput.prototype, "clientId", void 0);
ProjectInput = __decorate([
    (0, type_graphql_1.InputType)()
], ProjectInput);
let UpdateInput = class UpdateInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateInput.prototype, "description", void 0);
UpdateInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateInput);
let ProjectResolver = class ProjectResolver {
    client(root) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const c = yield clientSchema_1.default.findById(root._doc.clientId);
                return c;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    projects() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield projectSchema_1.default.find();
            return data;
        });
    }
    project(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield projectSchema_1.default.findById(id);
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createProject(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options.status)
                    options.status = ProjectType_1.StatusEnum.NotStarted;
                const data = yield projectSchema_1.default.create(options);
                yield data.save();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield projectSchema_1.default.findByIdAndDelete(id);
                return data ? true : false;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    updateProject(projectId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Object.entries(options).map(([key, value]) => value).length === 0)
                    return new Error('At least one argument must be provided');
                const data = yield projectSchema_1.default.findByIdAndUpdate(projectId, {
                    $set: options
                }, { new: true });
                return data;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => ClientType_1.default),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectType_1.default]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "client", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ProjectType_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "projects", null);
__decorate([
    (0, type_graphql_1.Query)(() => ProjectType_1.default),
    __param(0, (0, type_graphql_1.Arg)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ProjectType_1.default),
    __param(0, (0, type_graphql_1.Arg)('options', () => ProjectInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ProjectType_1.default),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Arg)('options', () => UpdateInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "updateProject", null);
ProjectResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => ProjectType_1.default)
], ProjectResolver);
exports.default = ProjectResolver;
