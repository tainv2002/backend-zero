const path = require("path");
const fs = require("fs");

const uploadSingleFile = async (fileObject) => {
    const uploadPath = path.resolve(__dirname, "../public/images/upload");

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
    }

    const extName = path.extname(fileObject.name);
    const baseName = path.basename(fileObject.name, extName);
    const finalName = `${baseName}-${Date.now()}${extName}`;
    const finalPath = path.join(uploadPath, finalName);

    // Use the mv() method to place the file somewhere on your server
    try {
        await fileObject.mv(finalPath);

        return {
            status: "success",
            path: finalName,
            error: null,
        };
    } catch (err) {
        return {
            status: "failed",
            path: null,
            error: JSON.stringify(err),
        };
    }
};

const uploadMultipleFiles = async (filesArr) => {
    try {
        const uploadPath = path.resolve(__dirname, "../public/images/upload");
        const results = [];
        let countSuccess = 0;

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        for (const file of filesArr) {
            const extName = path.extname(file.name);
            const baseName = path.basename(file.name, extName);
            const finalName = `${baseName}-${Date.now()}${extName}`;
            const finalPath = path.join(uploadPath, finalName);

            try {
                await file.mv(finalPath);

                results.push({
                    status: "success",
                    path: finalName,
                    fileName: file.name,
                    error: null,
                });

                countSuccess++;
            } catch (err) {
                results.push({
                    status: "failed",
                    path: null,
                    fileName: file.name,
                    error: JSON.stringify(err),
                });
            }
        }

        return {
            countSuccess,
            detail: results,
        };
    } catch (err) {
        console.log(err);
    }
};

module.exports = { uploadSingleFile, uploadMultipleFiles };
