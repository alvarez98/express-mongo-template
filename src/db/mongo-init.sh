mongo --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD \
 --eval "db = db.getSiblingDB('$MONGO_DB'); \
db.createUser({ user: '$MONGO_USERNAME', \
pwd: '$MONGO_PASSWORD', roles: [{ role: 'readWrite', db: '$MONGO_DB' }] });"

mongo $MONGO_DB --username $MONGO_USERNAME --password $MONGO_PASSWORD \
--eval "db.createCollection('$MONGO_COLLECTION')"