const User = require("../models/user");
const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");

const getUsersAPI = async (req, res) => {
    const results = await User.find({});

    return res.status(200).json({
        EC: 0,
        data: results,
    });
};

const postCreateUserAPI = async (req, res) => {
    const { email, name, city } = req.body;

    const user = await User.create({
        email,
        name,
        city,
    });

    return res.status(200).json({
        EC: 0,
        data: user,
    });
};

const putUpdateUserAPI = async (req, res) => {
    const { email, name, city, id } = req.body;

    const user = await User.findByIdAndUpdate(id, {
        email,
        name,
        city,
    });

    return res.status(200).json({
        EC: 0,
        data: user,
    });
};

const deleteUserAPI = async (req, res) => {
    const { id } = req.body;

    const user = await User.findByIdAndDelete(id);

    return res.status(200).json({
        EC: 0,
        data: user,
    });
};

const postUploadSingleFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded");
    }

    const result = await uploadSingleFile(req.files.image);

    return res.status(200).json({
        EC: 0,
        data: result,
    });
};

const postUploadMultipleFilesAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded");
    }

    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image);

        return res.status(200).json({
            EC: 0,
            data: result,
        });
    } else {
        return await postUploadSingleFileAPI(req, res);
    }
};

module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileAPI,
    postUploadMultipleFilesAPI,
};
