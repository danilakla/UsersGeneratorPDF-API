import { Injectable } from '@nestjs/common';
import * as PDFDocument from "pdfkit";

@Injectable()
export class UtilsService {

  async convertPDFtoBuffer(doc:any):Promise<Buffer>{

    try {
      const buffer:Buffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        doc.on('data', (chunk: Buffer) => {
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
      return  buffer;
    }catch (e) {
      throw  e;
    }
  }

}
