import { User } from "../users/users.model";
import * as PDFDocument from "pdfkit";
import { UtilsService } from "../utils/utils.service";
export declare class FilesService {
    private readonly utilService;
    constructor(utilService: UtilsService);
    generatePdf(user: User): Promise<PDFDocument>;
    private preparingDB;
    private saveFile;
    uploadImage(file: any): Promise<string>;
}
