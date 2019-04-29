"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var decorators_2 = require("../decorators");
var action_1 = require("../kernel/action");
var route_types_1 = require("../kernel/route-types");
var kernel_utils_1 = require("../kernel/kernel-utils");
var mysql_factory_1 = require("../mysql/mysql_factory");
var LogonAction = /** @class */ (function (_super) {
    __extends(LogonAction, _super);
    function LogonAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogonAction.prototype.validateData = function () {
        new kernel_utils_1.KernelUtils().createExceptionApiError('1001', 'Usuário e senha inválidos', this.req.body.userName == '' || this.req.body.password == '');
    };
    LogonAction.prototype.generateSQL = function () {
        return 'select * from usuario where usuario.username = \'' + this.req.body.userName + '\' and usuario.password = \'' + this.req.body.password + '\'';
    };
    LogonAction.prototype.generateSQLGetCidades = function () {
        return 'select * from cidade';
    };
    LogonAction.prototype.generateSQLGetBairro = function () {
        return 'select * from bairro where bairro.cidade_idCidade = ' + this.req.params.idcidade;
    };
    LogonAction.prototype.generateSQLGetTamanho = function () {
        return 'select * from tamanho';
    };
    LogonAction.prototype.generateSQLGetSabores = function () {
        return 'select * from sabor where tamanho_idTamanho = ' + this.req.params.idtamanho;
    };
    LogonAction.prototype.generateSQLCadastrarUsuario = function () {
        return 'INSERT INTO usuario (username, password) values (\'' + this.req.body.userName + '\' , \'' + this.req.body.password + '\')';
    };
    LogonAction.prototype.generateSQLGetUsuarios = function () {
        return 'select * from usuario';
    };
    LogonAction.prototype.generateSQLDeletarUsuario = function () {
        return 'delete from usuario where idusuario = ' + this.req.body.idUsuario + ' and username = \'' + this.req.body.userName + '\'';
    };
    LogonAction.prototype.generateSQLAlterarUsuario = function () {
        return 'update usuario ' +
            ' set password = \'' + this.req.body.password + '\' ' +
            ' where idusuario = ' + this.req.body.idusuario +
            '   and username = \'' + this.req.body.userName + '\'';
    };
    LogonAction.prototype.Post = function () {
        var _this = this;
        this.validateData();
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQL()).subscribe(function (data) {
            if (!data.length || data.length != 1) {
                _this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Usuário e senha inválidos'));
                return;
            }
            _this.sendAnswer({ data: data });
        }, function (error) {
            _this.sendError(error);
        });
    };
    LogonAction.prototype.cadastrarUsuario = function () {
        var _this = this;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQLCadastrarUsuario()).subscribe(function (data) {
            console.log(data);
            _this.sendAnswer(data);
        }, function (error) {
            console.log(error);
            _this.sendError(error);
        });
    };
    LogonAction.prototype.deletarUsuario = function () {
        var _this = this;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQLDeletarUsuario()).subscribe(function (data) {
            console.log(data);
            _this.sendAnswer(data);
        }, function (error) {
            console.log(error);
            _this.sendError(error);
        });
    };
    LogonAction.prototype.alterarUsuario = function () {
        var _this = this;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQLAlterarUsuario()).subscribe(function (data) {
            console.log(data);
            _this.sendAnswer(data);
        }, function (error) {
            console.log(error);
            _this.sendError(error);
        });
    };
    LogonAction.prototype.GetCidade = function () {
        var _this = this;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQLGetCidades()).subscribe(function (data) {
            _this.sendAnswer(data);
        }, function (error) {
            _this.sendError(error);
        });
    };
    LogonAction.prototype.GetBairro = function () {
        var _this = this;
        var idcidade = this.req.params.idcidade;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQLGetBairro()).subscribe(function (data) {
            _this.sendAnswer(data);
        }, function (error) {
            _this.sendError(error);
        });
    };
    LogonAction.prototype.GetTamanho = function () {
        var _this = this;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQLGetTamanho()).subscribe(function (data) {
            _this.sendAnswer(data);
        }, function (error) {
            _this.sendError(error);
        });
    };
    LogonAction.prototype.GetSabores = function () {
        var _this = this;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQLGetSabores()).subscribe(function (data) {
            _this.sendAnswer(data);
        }, function (error) {
            _this.sendError(error);
        });
    };
    LogonAction.prototype.GetUsuarios = function () {
        var _this = this;
        new mysql_factory_1.MySQLFactory().getConnection().select(this.generateSQLGetUsuarios()).subscribe(function (data) {
            _this.sendAnswer(data);
        }, function (error) {
            _this.sendError(error);
        });
    };
    LogonAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/logon'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "Post", null);
    __decorate([
        decorators_1.Post('/cadastro'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "cadastrarUsuario", null);
    __decorate([
        decorators_1.Post('/delUsuario'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "deletarUsuario", null);
    __decorate([
        decorators_1.Post('/alterarUsuario'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "alterarUsuario", null);
    __decorate([
        decorators_2.Get('/cidades'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "GetCidade", null);
    __decorate([
        decorators_2.Get('/bairros/:idcidade'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "GetBairro", null);
    __decorate([
        decorators_2.Get('/tamanhos'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "GetTamanho", null);
    __decorate([
        decorators_2.Get('/sabores/:idtamanho'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "GetSabores", null);
    __decorate([
        decorators_2.Get('/usuarios'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LogonAction.prototype, "GetUsuarios", null);
    return LogonAction;
}(action_1.Action));
exports.LogonAction = LogonAction;
