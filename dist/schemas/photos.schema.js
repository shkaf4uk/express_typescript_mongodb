"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const mongoose_1 = require("mongoose");
const photoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    thumbnailUrl: { type: String, required: true, unique: true },
    albumId: { type: mongoose_1.Types.ObjectId, ref: 'albums' },
    owner: { type: mongoose_1.Types.ObjectId, ref: 'users' }
});
exports.Photo = (0, mongoose_1.model)('photos', photoSchema);
//# sourceMappingURL=photos.schema.js.map