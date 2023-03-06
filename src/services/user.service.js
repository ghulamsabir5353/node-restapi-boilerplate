const User = require('@models/User.model');
const { MainErrorHandler } = require('@helpers/MainErrorHandler');
require('./types');

class UserService {
  constructor() {
    this.collection = User;
  }

  /**
   * @param {userModelType} criteria
   */
  async find(criteria = {}, fields = [], options = {}) {
    try {
      const users = await this.collection.find(criteria, fields, options);

      return users;
    } catch (err) {
      throw new MainErrorHandler(err.message);
    }
  }

  /**
   * @param {userModelType} data
   */
  async create(data) {
    try {
      // console.log(data);

      const newUserObject = await User({
        ...data,
      });

      const checkUser = await this.collection.findOne({ email: data.email });

      if (checkUser) {
        throw new MainErrorHandler('This email is already exist', 409);
      }

      const createdUser = await newUserObject.save();

      return createdUser;
    } catch (err) {
      throw new MainErrorHandler(err.message);
    }
  }

  /**
   * @param {userModelType} data
   */

  async findAll(data) {
    try {
      // console.log(data);
      let { page, searchByName, dataPerPage } = data;

      //pagination start
      //number of records to show on page is dataPerPage to int
      const perPage = parseInt(dataPerPage);

      let total;

      //counting records
      if (searchByName) {
        total = await this.collection
          .find({
            fullName: { $regex: searchByName, $options: 'i' },
          })
          .estimatedDocumentCount();
      } else {
        total = await this.collection.find().estimatedDocumentCount();
      }

      //fetching records with pagination
      //calculating number of pagination links required

      let pages = Math.ceil(total / perPage);

      //get current page number
      let pageNumber = parseInt(page);

      //get records to skip
      let startForm = (pageNumber - 1) * perPage;

      //Pagination End

      let users;

      if (searchByName) {
        //fetching records with name
        users = await this.collection
          .find({
            fullName: { $regex: searchByName, $options: 'i' },
          })
          .lean()
          .sort({ createdAt: -1 })
          .skip(searchByName ? 0 : startForm)
          .limit(perPage);
      } else {
        //fetching records without search name
        users = await this.collection
          .find()
          .lean() // If you're executing a query and sending the results without modification to, say, an Express response, you should use lean for best performance
          .sort({ createdAt: -1 })
          .skip(startForm)
          .limit(perPage);
      }

      return { users, pages };
    } catch (err) {
      throw new MainErrorHandler(err.message);
    }
  }

  /**
   * @param {userModelType} criteria
   */

  async findOneById(criteria = {}, fields = [], options = {}) {
    try {
      return await this.collection.findOne(criteria, fields, options);
    } catch (err) {
      throw new MainErrorHandler(err.message);
    }
  }

  /**
   * @param {userModelType} critera
   * @param {userModelType} data
   */

  async updateUser(criteria, data, upsert = false) {
    try {
      return await this.collection.findOneAndUpdate(criteria, data, {
        upsert,
        new: true,
        runValidators: true, //if body contain invalid data it will evaluate according to our define model validation
      });
    } catch (err) {
      throw new MainErrorHandler(err.message);
    }
  }

  /**
   * @param {userModelType} criteria
   */
  async deleteOne(criteria = {}) {
    try {
      return await this.collection.findByIdAndDelete(criteria);
    } catch (err) {
      throw new MainErrorHandler(err.message);
    }
  }
}

module.exports = { UserService };
