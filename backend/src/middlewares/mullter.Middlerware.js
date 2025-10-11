import multer from "multer";

console.log("i am in multer middleware");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./backend/public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
    
});
console.log("i am in multer middleware after storage");
const upload = multer({storage, });

export { upload };