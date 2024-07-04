export declare class AppService {
    getHello(): string;
    takePointsScreenshots(qrcodes: string[], url: string, token: string, sector_id: number, site_id: number, floor_id: number, folder_name: string, openBrowser: boolean, timeout: number, waitbeforesaving: number): Promise<string>;
    takeQrCardsScreenshots(qrcodes: string[], url: string, token: string, folder_name: string, openBrowser: boolean, timeout: number, waitbeforesaving: number): Promise<string>;
    takeStaffCardsScreenshots(qrcodes: string[], url: string, token: string, folder_name: string, openBrowser: boolean, timeout: number, waitbeforesaving: number): Promise<string>;
    takeScreenshots(elements: string[], url: string, token: string, endpoint: string, folder_name: string, folder_type: string, openBrowser: boolean, timeout: number, waitbeforesaving: number): Promise<string>;
}
