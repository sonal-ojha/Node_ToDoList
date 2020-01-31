var bodyParser = require('body-parser')

var data = [
    {
        item: 'bring groceries',
        id: '0',
    },
    {
        item: 'Cook Meals',
        id: '1',
    },
    {
        item: 'Clean Room',
        id: '2',
    }
]

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {
    app.use(bodyParser.json());
    app.get('/', function(req, res) {
        res.render('todo', {todos: data});
    })

    app.post('/todo', urlencodedParser, function(req, res) {
        const newItem = req.body;
        newItem.id = data.length.toString();
        data.push(newItem);
        // res.json(data);
        res.end();
    })

    app.delete('/todo/:item', function(req, res) {
        const deleteID = req.params.item;
        const deleteIndex = data.findIndex(item => item.id === deleteID);
        console.log('deleteIndex =', deleteIndex);
        if (deleteIndex !== -1) {
            data.splice(deleteIndex, 1);
            console.log('After Delete =', data);
            res.json(data);
            // res.end();
        }
    })
}