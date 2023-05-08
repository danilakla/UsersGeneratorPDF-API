export interface IUtilsService {
  convertPDFtoBuffer(doc: any): Promise<Buffer>;

}

export const IUtilsService = Symbol("IUtilsService");