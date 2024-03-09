// multerConfig.ts

import { v4 as uuidv4 } from 'uuid';
import multer, { diskStorage } from 'multer';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4();
    const originalExtension = file.originalname.split('.').pop();
    cb(null, uniqueFilename + '.' + originalExtension);
  },
});

const upload = multer({ storage: storage });

export { upload };
