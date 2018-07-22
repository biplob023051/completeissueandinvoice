import multer from 'multer';
import path from 'path';
const TMP_FOLDER = './tmp/uploads';
export default {
    uploadFile(req, res, next) {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, TMP_FOLDER);
            },
            filename: function (req, file, cb) {
                console.log(file);
                cb(null, Date.now() + '-' + file.originalname)
            }
        });
        var upload = multer({ storage: storage }).single('file');
        upload(req, res, function(err) {
            if (err) {
                return res.status(501).json(err);
            }
            return res.json({filename: req.file.filename, originalname: req.file.originalname});
        });
    },
    getPhoto(req, res, next) {
        let { photo } = req.params;
        return res.sendFile(path.join(__dirname, "../../../uploads/photos/" + photo));
    }
}