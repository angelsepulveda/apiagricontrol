module.exports = {
  PORT: process.env.PORT,
  DB_APP_ZONE_COMUN: {
    host: process.env.MYSQL_HOST_APP_ZONE_COMUN,
    database: process.env.MYSQL_DATABASE_APP_ZONE_COMUN,
    username: process.env.MYSQL_USERNAME_APP_ZONE_COMUN,
    password: process.env.MYSQL_PASSOWORD_APP_ZONE_COMUN,
    port: process.env.MYSQL_PORT_APP_ZONE_COMUN,
  },
  DB_AGRI_CONTROL: {
    host: process.env.MYSQL_HOST_AGRI_CONTROL,
    database: process.env.MYSQL_DATABASE_AGRI_CONTROL,
    username: process.env.MYSQL_USERNAME_AGRI_CONTROL,
    password: process.env.MYSQL_PASSOWORD_AGRI_CONTROL,
    port: process.env.MYSQL_PORT_AGRI_CONTROL,
  },
  AUTH: {
    secret: process.env.AUTH_SECRET,
    expires: process.env.AUTH_EXPIRES,
    rounds: process.env.AUTH_ROUNDS,
  },
};
