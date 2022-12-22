import { createConnection } from "mysql";
import bluebird from "bluebird";

let connectionUri = {
  host: "localhost",
  user: "root",
  password: "Thermalenn@18",
  database: "js",
};

async function main() {
  let connection = createConnection(connectionUri);
  bluebird.promisifyAll(connection);

  await connection.connectAsync();

  let sql = `select * from message`;
  let results = await connection.queryAsync(sql);

  connection.endAsync();
  console.log(results);
}

main();
