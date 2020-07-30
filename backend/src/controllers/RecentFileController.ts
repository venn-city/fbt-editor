import { Request, Response } from "express";
import ResponseProvider from "src/providers/ResponseProvider";
import RecentFileIdProvider from "./../providers/RecentFileIdProvider";

class RecentFileController {
  private readonly responseProvider: ResponseProvider = new ResponseProvider();

  constructor() {
    this.getAll = this.getAll.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    const recentFiles = RecentFileIdProvider.getAll();
    return this.responseProvider.createSuccessfullResponse(res, recentFiles);
  }
}

export default new RecentFileController();
