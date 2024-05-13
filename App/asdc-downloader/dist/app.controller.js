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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const screen_dto_1 = require("./dto/screen.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async takePointsScreenshots(body) {
        const message = await this.appService.takePointsScreenshots(body.qr_codes, body.url, body.token, body.sector_id, body.site_id, body.floor_id, body.folder_name);
        return {
            status: 'success',
            message,
        };
    }
    async takeQrCardsScreenshots(body) {
        const message = await this.appService.takeQrCardsScreenshots(body.qr_codes, body.url, body.token, body.folder_name);
        return {
            status: 'success',
            message,
        };
    }
    async takeStaffCardsScreenshots(body) {
        const message = await this.appService.takeStaffCardsScreenshots(body.qr_codes, body.url, body.token, body.folder_name);
        return {
            status: 'success',
            message,
        };
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('points'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [screen_dto_1.screenshot]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "takePointsScreenshots", null);
__decorate([
    (0, common_1.Post)('qrcards'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [screen_dto_1.screenshot]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "takeQrCardsScreenshots", null);
__decorate([
    (0, common_1.Post)('staff_cards'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [screen_dto_1.screenshot]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "takeStaffCardsScreenshots", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('downloader'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map