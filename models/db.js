import {query} from './query';

query(
  "CREATE TABLE IF NOT EXISTS work ("
  + " id INT(10) NOT NULL AUTO_INCREMENT, "
  + "hours DECIMAL(5,2) DEFAULT 0, "
  + "data DATE, "
  + "archived INT(1) DEFAULT 0, "
  + "description LONGTEXT,"
  + "PRIMARY KEY(ID))",
  function (err) {
    if (err) throw err;
    console.log('---')

  }
)