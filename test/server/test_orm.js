const orm = require('../../server/src/orm')

const element = {
    id: 0,
    name: 'Vrere',
}
const up = {
    type: 'from',
    id: 1,
    name: 'Andre',
    user_id: 3
}
const table = 'actions'

console.log(orm.generateUpdateRequest(table, up), '\n');


const columns = ['actions.id', 'actions.name action_name', 'services.name service_name']
const joins = {
'services': 'actions.service_id=services.id',
'users': 'users.id=services.user_id'
}
const where = 'users.id=2';
const order = 'date';

console.log(orm.generateDeleteRequest(table, 2), '\n')

console.log(orm.generateInsertRequest(table, element), '\n')

console.log(orm.generateSelectRequest(table, columns, where, joins, undefined))
