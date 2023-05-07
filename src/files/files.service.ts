import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as uuid from "uuid";
import * as path from "path";
import * as fs from "fs";
import { User } from "../users/users.model";
import * as PDFDocument from "pdfkit";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class FilesService {
  constructor(private readonly utilService: UtilsService) {
  }

  async generatePdf(user: User): Promise<PDFDocument> {
    try {

      if (!user)return false;


      await this.saveFile(user);
      const data=await this.preparingDB(user);
      return data;

      return PDFDocument;
    } catch (e) {
      throw e;
    }
  }
  private async preparingDB(user:User){
    const docdb = new PDFDocument();

    docdb.text(`Name: ${user.firstName} ${user.lastName}`);
    docdb.moveDown();
    docdb.image(path.resolve(__dirname, "..", "static", user.image), { width: 100, height: 100 });
    const buffPDT = await this.utilService.convertPDFtoBuffer(docdb);
    return buffPDT;
  }
  private async saveFile(user: User){
    const doc = new PDFDocument();
    const fileName = `${user.firstName}_${user.lastName}.pdf`;

    // Add user data to PDF
    doc.text(`Name: ${user.firstName} ${user.lastName}`);
    doc.moveDown();
    doc.image(path.resolve(__dirname, "..", "static", user.image), { width: 100, height: 100 });
    // save PDF to disk
    const filePath = path.resolve(__dirname, "..", "static");
    doc.pipe(fs.createWriteStream(path.join(filePath, fileName)));
    doc.end();
  }
  async uploadImage(file): Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "static");
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        "an error occurred while writing the file",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
