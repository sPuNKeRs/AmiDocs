var mongodb = require('mongodb'); 
var acl = require('acl');

mongodb.connect("mongodb://127.0.0.1:27017/amidocs", function(error, db) {
  var mongoBackend = new acl.mongodbBackend(db, 'acl_');

  acl = new acl(mongoBackend);

  acl.allow('admin', 'user', ['view', 'create', 'update', 'delete', 'viewList']);

  acl.addUserRoles('559acc3abfd220e32ed4ddc2', 'admin');
  acl.addUserRoles('559acc3abfd220e32ed4ddc2', 'su');

  console.log('Инициализация ACL');
}); 