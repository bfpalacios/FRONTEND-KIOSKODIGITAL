import { UserModel } from '../models/entities/user.model';
export function mapUser(userModel: UserModel): UserModel {

    userModel.country = "PE";
    userModel.urbanization = "S.U";
    userModel.creationUser = userModel.dni;
    userModel.updateUser =  userModel.entityId
    return userModel;
}