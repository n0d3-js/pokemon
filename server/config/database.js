import mongoose from 'mongoose';
import logger from './logging';
let uri;

if (process.env.VCAP_SERVICES) {
  const vcap = JSON.parse(process.env.VCAP_SERVICES);
  uri = vcap.mlab[0].credentials.uri;
} else {
  const db = process.env.DB;
  uri = `mongodb://localhost/${db}`;
}

mongoose.connect(uri);
logger.log('info', '[MONGODB] - Database Host: %s', mongoose.connections[0].host);
logger.log('info', '[MONGODB] - Database Name: %s', mongoose.connections[0].name);
