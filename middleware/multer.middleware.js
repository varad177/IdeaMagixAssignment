
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory for uploaded files
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname); // Use the original file name as the destination file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB in size limit
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.webp' &&
      ext !== '.png' &&
      ext !== '.mp4'
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
