import { Model } from "mongoose";
import { UserSchemaType } from "@infrastructure/database/mongoose";
import { IUserRepository } from "./IUserRepository";
import { User } from "../domain/User";

/**
 * UserRepository class that implements IUserRepository interface.
 * This class is responsible for interacting with the user database.
 */
export class UserRepository implements IUserRepository {
  private userModel: Model<UserSchemaType>;

  constructor(userModel: Model<UserSchemaType>) {
    this.userModel = userModel;
  }

  async create(user: UserSchemaType): Promise<void> {
    const newUser = new this.userModel(user);
    await newUser.save();
  }

  async getUserById(id: string): Promise<any> {
    const userDoc = await this.userModel.findById(id).exec();
    return userDoc ? userDoc.toObject() : null;
  }

  async getUserByEmail(email: string): Promise<any> {
    const userDoc = await this.userModel.findOne({ email }).exec();
    return userDoc ? userDoc.toObject() : null;
  }

  async update(id: string, user: User): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { ...user }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
