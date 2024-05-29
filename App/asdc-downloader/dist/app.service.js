"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const os = require("os");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async takePointsScreenshots(qrcodes, url, token, sector_id, site_id, floor_id, folder_name) {
        const endpoint = `https://${url}/dashboard/structure/sites/${sector_id}/floors/${site_id}/points/${floor_id}?isRedirected=true&itemsPerPage=0`;
        return this.takeScreenshots(qrcodes, url, token, endpoint, folder_name, 'points');
    }
    async takeQrCardsScreenshots(qrcodes, url, token, folder_name) {
        const endpoint = `https://${url}/dashboard/qrcard?itemsPerPage=0`;
        return this.takeScreenshots(qrcodes, url, token, endpoint, folder_name, 'qr-containers');
    }
    async takeStaffCardsScreenshots(qrcodes, url, token, folder_name) {
        const endpoint = `https://${url}/dashboard/staff?itemsPerPage=0`;
        return this.takeScreenshots(qrcodes, url, token, endpoint, folder_name, 'staff-cards');
    }
    async takeScreenshots(points, url, token, endpoint, folder_name, folder_type) {
        try {
            console.log('Starting Application');
            const browser = await puppeteer.launch({
                defaultViewport: {
                    width: 1920,
                    height: 1080,
                    deviceScaleFactor: 0,
                },
            });
            console.log('Browser opened');
            const page = await browser.newPage();
            console.log('Page created');
            const jwtCookie = {
                name: 'token',
                value: token,
            };
            await page.goto(`https://${url}/login`);
            console.log('Logged in Successfully');
            await page.setCookie(jwtCookie);
            console.log('Cookie set successfully');
            await page.goto(endpoint);
            console.log('Navigated to the page');
            const desktopPath = path.join(os.homedir(), 'Desktop');
            const folder = path.join(desktopPath, 'Rasid-Screens', folder_name + '_' + folder_type + '_' + Date.now());
            fs.mkdirSync(folder, {
                recursive: true,
            });
            console.log('Waiting for 15 seconds to load all images');
            await new Promise((resolve) => setTimeout(resolve, 15000));
            console.log(`Start Downloading At : ${new Date().getMinutes()}:${new Date().getSeconds()}`);
            let i = 0;
            for (const point of points) {
                try {
                    console.log(`${String(++i).padStart(4, '0')}. Taking screenshot of ${point}.`);
                    const elementHandle = await page.$(`#id${point}`);
                    if (elementHandle) {
                        const boundingBox = await elementHandle.boundingBox();
                        if (!boundingBox) {
                            console.error('Element not found or not visible');
                            await browser.close();
                            return;
                        }
                        await page.screenshot({
                            path: path.join(folder, `${String(i).padStart(4, '0')}. point_${point}.png`),
                            clip: {
                                x: boundingBox.x,
                                y: boundingBox.y,
                                width: boundingBox.width,
                                height: boundingBox.height,
                            },
                        });
                    }
                }
                catch (error) {
                    console.log(error.message);
                }
            }
            console.log(`Finished Downloading At : ${new Date().getMinutes()}:${new Date().getSeconds()}`);
            console.log('Screenshots taken!');
            await browser.close();
            return 'Screenshots taken!';
        }
        catch (error) {
            console.log(error.message);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map