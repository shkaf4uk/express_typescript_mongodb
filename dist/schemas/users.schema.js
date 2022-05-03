"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    login: { type: String, required: true, minlength: 3, maxlength: 50, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6, maxlength: 100, trim: true },
    registerDate: { type: Date, default: Date.now }
});
exports.User = (0, mongoose_1.model)('users', usersSchema);
//# sourceMappingURL=users.schema.js.map