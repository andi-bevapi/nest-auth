// const databaseOptions = {
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "ovla",
//     password: "ovla",
//     database: "nest_auth",
//     synchronize: true
//   }

// export default databaseOptions;

const configuration = () => ({
  type: "mysql",
    host: "localhost",
    port: 3306,
    username: "ovla",
    password: "ovla",
    database: "nest_auth",
    synchronize: true
});

export default configuration;