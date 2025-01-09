import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, "./public/images");
    },
    // Store file in a .png/.jpeg/.jpg format instead of binary
    filename: function (req, file, cb) {
        var _a;
        let fileExtension = "";
        if (file.originalname.split(".").length > 1) {
            fileExtension = file.originalname.substring(file.originalname.lastIndexOf("."));
        }
        const filenameWithoutExtension = (_a = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-")) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        cb(null, filenameWithoutExtension +
            Date.now() +
            Math.ceil(Math.random() * 1e5) + // avoid rare name conflict
            fileExtension);
    },
});
// Middleware responsible to read form data and upload the File object to the mentioned path
export const upload = multer({
    storage,
    limits: {
        fileSize: 30 * 1000 * 1000,
    },
});