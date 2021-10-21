function generateInsertRequest(table, element)
{
  const columns = Object.keys(element).join(', ');
  const values = Object.values(element);

  for (let i = 0; i < values.length; i++) {
    values[i] = "'" + values[i] + "'";
  }

  return `INSERT INTO ${table} (${columns}) VALUES (${values.join(', ')}) RETURNING *`;
}

function generateUpdateRequest(table, update)
{
  const keys = Object.keys(update);
  const values = Object.values(update);
  let ups = [];

  let index = 0;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== 'id') {
        ups[index] = keys[i] + "='" + values[i] + "'";
        index++;
    }
  }
  return `UPDATE ${table} SET ${ups.join(', ')} WHERE id='${update.id}' RETURNING *`;
}

function generateDeleteRequest(table, id)
{
  return "DELETE FROM " + table + " WHERE id=" + id
}

function generateSelectRequest(table, columns, condition, joins, order)
{
  let sql = "SELECT " + (columns ? columns.join(', ') : "*");

  sql += "\nFROM " + table;
  if (joins) {
    const keys = Object.keys(joins);
    const values = Object.values(joins);

    for (let i = 0; i < keys.length; i++) {
      sql += "\nJOIN " + keys[i] + " ON " + values[i]
    }
  }
  if (condition)
    sql += "\nWHERE " + condition;
  if (order)
    sql += "\nORDER BY " + order;
  return sql
}

module.exports = {
  generateInsertRequest,
  generateSelectRequest,
  generateUpdateRequest,
  generateDeleteRequest
};
