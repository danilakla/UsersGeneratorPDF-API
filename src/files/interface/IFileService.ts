import { User } from "src/users/users.model";

export interface IFilesService {
  generatePdf(user: User): Promise<Buffer>;
  uploadImage(file: any): Promise<string>;


}
export const IFilesService = Symbol("IFilesService");