"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(userId, id, name, email, role, password, createdBy, isActive = true, TimeZone, createdAt, updatedAt, groupId) {
        this.userId = userId;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.createdBy = createdBy;
        this.isActive = isActive;
        this.TimeZone = TimeZone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.groupId = groupId;
    }
}
exports.UserEntity = UserEntity;
