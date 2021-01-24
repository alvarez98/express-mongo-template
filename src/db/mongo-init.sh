mongo --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD \
 --eval "db = db.getSiblingDB('$DB_NAME'); \
db.createUser({ user: '$DB_USERNAME', \
pwd: '$DB_PASSWORD', roles: [{ role: 'readWrite', db: '$DB_NAME' }] });"

mongo $DB_NAME --username $DB_USERNAME --password $DB_PASSWORD \
--eval "db.createCollection('$DB_COLLECTION')"