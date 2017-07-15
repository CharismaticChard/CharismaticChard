const db = require('../');

const Item = db.Model.extend({
  tableName: 'items',
  hasTimestamps: true,

  items: function () {
    return this.hasMany('Item');
  }
});

module.exports = db.model('Item', Item);