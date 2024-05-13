import { AppService } from './app.service';
import { screenshot } from './dto/screen.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    takePointsScreenshots(body: screenshot): Promise<{
        status: string;
        message: string;
    }>;
    takeQrCardsScreenshots(body: screenshot): Promise<{
        status: string;
        message: string;
    }>;
    takeStaffCardsScreenshots(body: screenshot): Promise<{
        status: string;
        message: string;
    }>;
    getHello(): string;
}
