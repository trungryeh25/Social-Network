import mongoose from "mongoose";
import IUser from "./users.interface";


const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model<IUser & mongoose.Document>("user", UserSchema);