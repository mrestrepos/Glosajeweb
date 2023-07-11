
<?php


abstract class Model {

  private $table;

  public function __construct ($table) {
    $this->table = $table;
  }

  private function useConnection($query) {
    require("connection.php");

    $res = $conn->query($query);

    $conn->close();
    return $res;
  }

  private function iterateKeyValue($arr, $space = ", ", $combine = false, $combine_final_space = " AND ") {
    $fields = [
      "f" => "",
      "v" => "",
      "c" => "",
    ];

    foreach ($arr as $key => $value) {
      $fields["f"] .= $key . $space;
      $fields["v"] .= "'" . $value . "'" . $space;
      if ($combine) {
        $fields["c"] .= $key . " = '" . $value . "'" . $combine_final_space;
      }
    }

    $fields["f"] = rtrim($fields["f"], $space);
    $fields["v"] = rtrim($fields["v"], $space);
    $fields["c"] = rtrim($fields["c"], $combine_final_space);

    return $fields;
  }

  public function insert($values) {
    ["v" => $value, "f" => $fields] = $this->iterateKeyValue($values);

    $query = "INSERT INTO " . $this->table . " (" . $fields . ") VALUES (" . $value . ")";
    return $this->useConnection($query);
  }

  public function getAll($where = []) {
    $whereClause = "";
    if (count($where) > 0) {
      $whereFields = $this->iterateKeyValue($where, " = ", true)["c"];
      $whereClause = " WHERE " . $whereFields;
    }

    $query = "SELECT * FROM " . $this->table . $whereClause;
    return $this->useConnection($query);
  }
}
