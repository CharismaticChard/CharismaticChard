const models = require('../../db/models');
const Controller = require('./controller.js');
const Promise = require('bluebird');

module.exports = {

  getAll: (req, res) => {
    return models.Split.findAll()
      .then(Controller.serveData)
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  },

  saveSplit: (req, res) => {
    // find with first name as well (or with user id)
    return models.Profile.findOne({ id: req.user.id })
      .then(profile => {
        req.split['splitter_id'] = profile.get('id');
        return models.Split.create(req.split);
      });
  },

  getSplitItems: (id) => {
    return models.Split.forge()
      // .orderBy('created_at', 'DESC')
      .query(function(qb) {
        qb.orderBy('created_at', 'DESC'); 
      })
      .where({ id })
      .fetchAll({ withRelated: 'items' })
      .catch((err) => {
        console.log(err);
      });
  },



  getMultipleSplits: (splitIds) => {
    return Promise.map(splitIds, (id) => {
      return module.exports.getSplitItems(id)
        .then(result => {
          return result.at(0).toJSON();
        });
    });
  },

  getMultipleSplitItems: (splits) => {
    return Promise.map(splits, (split, index, splits) => {
      return module.exports.getSplitItems(split.id)
        .then(results => {
          split.items = results.at(0).related('items').toJSON();
          return split;
        });
    });
  },

  getUsersItems: (req, res) => {
    // returns an object with the info for all the splits and items that belong to the user
    // fetchPage for pagination
    return models.Profile.forge().where({ id: req.user.id }).fetchAll({
      // page: 1,
      // pageSize: 20,
      withRelated: ['splits', 'items']
    })
      .catch(err => {
        console.log(err);
      });
  },

  getUsersOwnedSplits: (req, res) => {
    // returns an array of splits with all the items that belong to each split.
    return module.exports.getUsersItems(req, res)
      .then(result => {
        var splits = result.at(0).related('splits').toJSON();
        return module.exports.getMultipleSplitItems(splits);
      });
  },

  getUsersParticipatedSplits: (req, res) => {
    return module.exports.getUsersItems(req, res)
      .then(result => {
        var items = result.at(0).related('items').toJSON();
        var splitIds = items.map((item, index, splitIds) => {
          if (!splitIds.includes(item['split_id'])) {
            return item['split_id'];
          }
        });
        return module.exports.getMultipleSplits(splitIds);
      })
      .catch(err => {
        console.log(err);
      });
  }

};
