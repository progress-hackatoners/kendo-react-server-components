import { User } from "../models";
import fs from "fs";
import p from "path";

class Store {
  private _users: User[] = [];

  constructor() {}

  get users(): User[] {
    if (this._users.length === 0) {
      this._users = this.loadUsers();
    }

    return this._users;
  }

  private loadUsers(): User[] {
    return JSON.parse(fs.readFileSync(p.resolve("./data/db.json"), "utf8"));
  }
}

const instance = new Store();

export default instance;
