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
    async takePointsScreenshots(qrcodes, url, token, sector_id, site_id, floor_id, folder_name, openBrowser, timeout, waitbeforesaving) {
        const endpoint = `${url}/dashboard/structure/sites/${sector_id}/floors/${site_id}/points/${floor_id}?isRedirected=true&itemsPerPage=0`;
        return this.takeScreenshots(qrcodes, url, token, endpoint, folder_name, 'points', openBrowser, timeout, waitbeforesaving);
    }
    async takeQrCardsScreenshots(qrcodes, url, token, folder_name, openBrowser, timeout, waitbeforesaving) {
        const endpoint = `${url}/dashboard/qrcard?itemsPerPage=0`;
        return this.takeScreenshots(qrcodes, url, token, endpoint, folder_name, 'qr-containers', openBrowser, timeout, waitbeforesaving);
    }
    async takeStaffCardsScreenshots(qrcodes, url, token, folder_name, openBrowser, timeout, waitbeforesaving) {
        const endpoint = `${url}/dashboard/staff?itemsPerPage=0`;
        return this.takeScreenshots(qrcodes, url, token, endpoint, folder_name, 'staff-cards', openBrowser, timeout, waitbeforesaving);
    }
    async takeScreenshots(elements, url, token, endpoint, folder_name, folder_type, openBrowser, timeout, waitbeforesaving) {
        try {
            console.log('Starting Application');
            const browser = await puppeteer.launch({
                headless: openBrowser == true ? false : true,
                executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
                waitForInitialPage: true,
                args: [
                    '--start-maximized',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu',
                ],
                defaultViewport: null,
                timeout: timeout,
            });
            console.log('Browser opened');
            const homePage = (await browser.pages())[0];
            console.log('Home Page created');
            await homePage.goto(`http://127.0.0.1:5050/downloader/home`, {
                waitUntil: 'networkidle2',
                timeout: timeout,
            });
            console.log('Waiting for 5 seconds to open the browser');
            await new Promise((resolve) => setTimeout(resolve, 5000));
            const loginPage = await browser.newPage();
            console.log('Login Page created');
            const jwtCookie = {
                name: 'token',
                value: token,
            };
            await loginPage.setRequestInterception(true);
            loginPage.on('request', (req) => {
                const resourceType = req.resourceType();
                if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
                    req.abort();
                }
                else {
                    req.continue();
                }
            });
            const page = await browser.newPage();
            await page.goto(`${url}/login`, {
                timeout: timeout,
                waitUntil: 'networkidle2',
            });
            console.log('Logged in Successfully');
            await page.setCookie(jwtCookie);
            console.log('Cookie set successfully');
            await page.goto(endpoint, {
                timeout: timeout,
                waitUntil: 'networkidle2',
            });
            console.log('Navigated to the page ' + endpoint);
            const desktopPath = path.join(os.homedir(), 'Desktop');
            console.log('Desktop Path: ' + desktopPath);
            const folder = path.join(desktopPath, 'Rasid-Screens', folder_name + '_' + folder_type + '_' + Date.now());
            fs.mkdirSync(folder, {
                recursive: true,
            });
            console.log('Folder created: ' + folder);
            console.log(`Waiting for ${waitbeforesaving / 1000} seconds to load all images`);
            await new Promise((resolve) => setTimeout(resolve, waitbeforesaving));
            console.log(`Start Downloading At : ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
            let i = 0;
            for (const element of elements) {
                try {
                    console.log(`${String(++i).padStart(4, '0')}. Taking screenshot of ${element}.`);
                    const elementHandle = await page.$(`#id${element}`);
                    if (elementHandle) {
                        const boundingBox = await elementHandle.boundingBox();
                        if (!boundingBox) {
                            console.error(`Element ${element} boundingBox not found or not visible`);
                            continue;
                        }
                        const done = await page.screenshot({
                            path: path.join(folder, `${String(i).padStart(4, '0')}. element_${element}.png`),
                            clip: {
                                x: boundingBox.x,
                                y: boundingBox.y,
                                width: boundingBox.width,
                                height: boundingBox.height,
                            },
                        });
                        if (done) {
                            console.log(`Screenshot of ${element} taken successfully`);
                        }
                        else {
                            console.error(`Screenshot of ${element} not taken`);
                        }
                    }
                    else {
                        console.error(`Element ${element} not found or not visible`);
                    }
                }
                catch (error) {
                    console.error(error.message);
                    console.log('the browser will be closed in 5 seconds');
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    await browser.close();
                    return 'error ' + error.message;
                }
            }
            console.log(`Finished Downloading At : ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
            console.log('Screenshots taken!');
            console.log('the browser will be closed in 5 seconds');
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await browser.close();
            return 'Screenshots taken!';
        }
        catch (error) {
            console.error(error.message);
            return 'error ' + error.message;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map