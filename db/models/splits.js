const db = require('../');

const Split = db.Model.extend({
  tableName: 'splits',
  hasTimestamps: true,

  items: function () {
    return this.hasMany('Item');
  },

  profile: function () {
    return this.belongsTo('Profile', 'splitter_id');
  }


});

module.exports = db.model('Split', Split);