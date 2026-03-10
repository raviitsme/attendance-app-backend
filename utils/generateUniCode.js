import mongoose from "mongoose";
import University from "../models/University.js";

const generateUniCode = async () => {
    let code;
    let exists = true;

    while(exists) {
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        code = `UNI-${randomNum}`;

        const doesExists = await University.findOne({ uniCode : code });
        if(!doesExists) exists = false;
    }
    return code;
}

export default generateUniCode;