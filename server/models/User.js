import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login     : { type: String, required: true },
    password     : { type: String, required: true  },
    lastName     : { type: String },
    firstName     : { type: String },
    middleName     : { type: String },
    email      : { type: String},
    photo     : { type: String },
    isAdmin : { type: Boolean },
    createdAt : { type: Date }
    });

mongoose.model('User', UserSchema);