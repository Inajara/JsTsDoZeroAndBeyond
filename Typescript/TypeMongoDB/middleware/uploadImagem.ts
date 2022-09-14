/* import { diskStorage, Options } from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto'

const multerConfig = {
    //dest: resolve(__dirname, "..", "..", '../public'),
    storage: diskStorage({
        destination: (request, file, cb) => {
            cb(null, resolve(__dirname, 'public'))
        },
        filename: (request, file, cb) => {
            randomBytes(16, (error, hash) => {
                if(error){
                    cb(error, file.filename)
                }
                const filename = `${hash.toString('HEX')}.png`
                cb(null, filename)
            })
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (request, file, cb) => {
        const formats = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg']
        if(formats.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new Error('Formato não suportado'))
        }
    }
}

export default multerConfig as Options */

import { Request, Response } from "express";
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    destination: function (req: Request, file, cb, res: Response) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      if (!isValid) {
        return cb(new Error("Invalid image type"), false);
      }
      cb(null, "public");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-"); 
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
      },
    });
    const uploadOptions = multer({ storage: storage });

  export { uploadOptions };