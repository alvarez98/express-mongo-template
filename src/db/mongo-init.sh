mongo --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD \
 --eval "db = db.getSiblingDB('$MONGO_DB'); \
db.createUser({ user: '$MONGO_DB_USERNAME', \
pwd: '$MONGO_DB_PASSWORD', roles: [{ role: 'readWrite', db: '$MONGO_DB' }] });"

mongo $MONGO_DB --username $MONGO_DB_USERNAME --password $MONGO_DB_PASSWORD \
--eval "db.createCollection('$MONGO_DB_COLLECTION')"