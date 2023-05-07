"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
let UtilsService = class UtilsService {
    async convertPDFtoBuffer(doc) {
        try {
            const buffer = await new Promise((resolve, reject) => {
                const chunks = [];
                doc.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                doc.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
                doc.on('error', (err) => {
                    reject(err);
                });
                doc.end();
            });
            return buffer;
        }
        catch (e) {
            throw e;
        }
    }
};
UtilsService = __decorate([
    (0, common_1.Injectable)()
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map