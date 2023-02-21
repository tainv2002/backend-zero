const aqp = require("api-query-params");
const Customer = require("../models/customer");

const createCustomerService = async (data) => {
    try {
        return await Customer.create({
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            description: data.description,
            image: data.image,
        });
    } catch (err) {
        console.log(err);
        return null;
    }
};

const createArrayCustomersService = async (customers) => {
    try {
        return await Customer.insertMany(customers);
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getAllCustomersService = async (query) => {
    try {
        const { limit, filter: filters } = aqp(query);
        const { page, ...filter } = filters;
        const skip = (page - 1) * limit;

        return await Customer.find(filter).limit(limit).skip(skip);
    } catch (err) {
        console.log(err);
        return null;
    }
};

const updateCustomerService = async (id, data) => {
    try {
        return await Customer.findByIdAndUpdate(id, { ...data });
    } catch (err) {
        console.log(err);
        return null;
    }
};

const deleteCustomerService = async (id) => {
    try {
        return await Customer.deleteById(id);
    } catch (err) {
        console.log(err);
        return null;
    }
};

const deleteArrayCustomersService = async (arr) => {
    try {
        return await Customer.delete({ _id: { $in: arr } });
    } catch (err) {
        console.log(err);
        return null;
    }
};

module.exports = {
    createCustomerService,
    createArrayCustomersService,
    getAllCustomersService,
    updateCustomerService,
    deleteCustomerService,
    deleteArrayCustomersService,
};
