const oracledb = require('oracledb');

// Update these values with your Oracle DB credentials
const dbConfig = {
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  connectString: 'YOUR_DB_CONNECTION_STRING'
};

async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    return connection;
  } catch (err) {
    console.error('OracleDB connection error:', err);
    throw err;
  }
}

module.exports = { getConnection };
