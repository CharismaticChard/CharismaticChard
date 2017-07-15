const db = require('../');

const Split = db.Model.extend({
  tableName: 'splits',
  hasTimestamps: true,

  items: function () {
    return this.hasMany('Item');
  }
});

module.exports = db.model('Split', Split);