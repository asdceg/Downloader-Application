import * as puppeteer from 'puppeteer';
export declare class AppService {
    getHello(): string;
    takePointsScreenshots(qrcodes: string[], url: string, token: string, sector_id: number, site_id: number, floor_id: number, folder_name: string, openBrowser: boolean, timeout: number, waitbeforesaving: number): Promise<string>;
    takeQrCardsScreenshots(qrcodes: string[], url: string, token: string, folder_name: string, openBrowser: boolean, timeout: number, waitbeforesaving: number): Promise<string>;
    takeStaffCardsScreenshots(qrcodes: string[], url: string, token: string, folder_name: string, openBrowser: boolean, timeout: number, waitbeforesaving: number): Promise<string>;
    createBrowser(openBrowser: any, timeout: any): Promise<puppeteer.Browser>;
    interceptRequests(page: puppeteer.Page): Promise<void>;
    navigateToPage(page: puppeteer.Page, url: string, timeout: number): Promise<void>;
    setTokenCookie(page: puppeteer.Page, token: string): Promise<void>;
    createScreenshotFolder(folder_name: string, folder_type: string): Promise<string>;
    takeElementScreenshot(page: puppeteer.Page, element: string, folder: string, index: number): Promise<void>;
    takeElementScreenshotsParallel(page: puppeteer.Page, elements: string[], folder: string): Promise<void>;
    takeScreenshots(elements: string[], url: string, token: string, endpoint: string, folder_name: string, folder_type: string, openBrowser: boolean, timeout: number, waitbeforesaving: number): Promise<string>;
}
