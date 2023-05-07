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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const utils_service_1 = require("../utils/utils.service");
let FilesService = class FilesService {
    constructor(utilService) {
        this.utilService = utilService;
    }
    async generatePdf(user) {
        try {
            if (!user)
                return false;
            await this.saveFile(user);
            const data = await this.preparingDB(user);
            return data;
            return PDFDocument;
        }
        catch (e) {
            throw e;
        }
    }
    async preparingDB(user) {
        const docdb = new PDFDocument();
        docdb.text(`Name: ${user.firstName} ${user.lastName}`);
        docdb.moveDown();
        docdb.image(path.resolve(__dirname, "..", "static", user.image), { width: 100, height: 100 });
        const buffPDT = await this.utilService.convertPDFtoBuffer(docdb);
        return buffPDT;
    }
    async saveFile(user) {
        const doc = new PDFDocument();
        const fileName = `${user.firstName}_${user.lastName}.pdf`;
        doc.text(`Name: ${user.firstName} ${user.lastName}`);
        doc.moveDown();
        doc.image(path.resolve(__dirname, "..", "static", user.image), { width: 100, height: 100 });
        const filePath = path.resolve(__dirname, "..", "static");
        doc.pipe(fs.createWriteStream(path.join(filePath, fileName)));
        doc.end();
    }
    async uploadImage(file) {
        try {
            const fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve(__dirname, "..", "static");
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);
            return fileName;
        }
        catch (e) {
            throw new common_1.HttpException("an error occurred while writing the file", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utils_service_1.UtilsService])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map