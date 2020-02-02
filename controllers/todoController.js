var bodyParser = require('body-parser')
// Import Mongoose
var mongoose = require('mongoose');

// Connect to Database
mongoose.connect('mongodb+srv://sonal:soojha@cluster0-mmduw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

// Create a Schema: blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// Create A MODEL
var TodoModel = mongoose.model('ToDo', todoSchema);

// var itemOne = TodoModel({ item: 'Purchase Flowers' }).save(function(err) {
//     if (err) throw err;
//     console.log('Item is Saved in DB!!');
// })

// var data = [
//     {
//         item: 'bring groceries',
//         id: '0',
//     },
//     {
//         item: 'Cook Meals',
//         id: '1',
//     },
//     {
//         item: 'Clean Room',
//         id: '2',
//     }
// ]

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {
    app.use(bodyParser.json());
    app.get('/', function(req, res) {
        // res.render('todo', {todos: data});
        // Get Data From Database and send to client as response
        TodoModel.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        })
    })

    app.post('/todo', urlencodedParser, function(req, res) {
        const newItem = req.body;
        // newItem.id = data.length.toString();
        // data.push(newItem);
        // res.json(data);
        // Post Data in Database
        TodoModel(newItem).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        })
    })

    app.delete('/todo/:item', function(req, res) {
        const deleteID = req.params.item;
        // const deleteIndex = data.findIndex(item => item.id === deleteID);
        // if (deleteIndex !== -1) {
        //     data.splice(deleteIndex, 1);
        //     res.json(data);
        // }
        // DELETE todo item from Database
        TodoModel.find({ item: deleteID }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        })
    })
}