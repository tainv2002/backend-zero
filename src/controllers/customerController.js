const Joi = require("joi");

const {
    createCustomerService,
    createArrayCustomersService,
    getAllCustomersService,
    updateCustomerService,
    deleteCustomerService,
    deleteArrayCustomersService,
} = require("../services/customerService");
const { uploadSingleFile } = require("../services/fileService");

class CustomerController {
    // [GET] /v1/api/customers
    async all(req, res) {
        const customers = await getAllCustomersService(req.query);

        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers,
            });
        }

        return res.status(200).json({
            EC: -1,
            data: customers,
        });
    }

    // [POST] /v1/api/customers
    async create(req, res) {
        const data = { ...req.body };
        let imageUrl = "";

        if (req.files && Object.keys(req.files).length > 0) {
            const image = req.files.image;

            const result = await uploadSingleFile(image);
            imageUrl = result.path;
        }

        data.image = imageUrl;

        const schema = Joi.object({
            name: Joi.string().alphanum().min(3).max(30).required(),
            address: Joi.string(),
            phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")),
            email: Joi.string().email(),
            description: Joi.string(),
        });

        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(200).json({
                msg: error,
            });
        }

        const customer = await createCustomerService(data);

        return res.status(200).json({
            EC: 0,
            data: customer,
        });
    }

    // [PUT] /v1/api/customers
    async update(req, res) {
        const { id, name, address, phone, email, description } = req.body;

        const data = {
            name,
            address,
            phone,
            email,
            description,
        };

        const customer = await updateCustomerService(id, data);

        if (customer) {
            return res.status(200).json({
                EC: 0,
                data: customer,
            });
        }
        return res.status(200).json({
            EC: -1,
            data: customer,
        });
    }

    // [DEL] /v1/api/customers
    async delete(req, res) {
        const { id } = req.body;

        const customer = await deleteCustomerService(id);

        if (customer) {
            return res.status(200).json({
                EC: 0,
                data: customer,
            });
        }
        return res.status(200).json({
            EC: -1,
            data: customer,
        });
    }

    // [POST] /v1/api/customers-list
    async createArray(req, res) {
        const customers = await createArrayCustomersService(req.body.customers);

        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers,
            });
        }

        return res.status(200).json({
            EC: -1,
            data: customers,
        });
    }

    // [DEL] /v1/api/customers-list
    async deleteArray(req, res) {
        const customers = await deleteArrayCustomersService(
            req.body.customersId
        );

        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers,
            });
        }

        return res.status(200).json({
            EC: -1,
            data: customers,
        });
    }
}

module.exports = new CustomerController();
