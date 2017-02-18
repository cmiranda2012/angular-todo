//routes
const Todo = require('./models/todo');

module.exports = function(app) {

    // get all todos
    app.get('/api/todos', function(req, res) {

        Todo.find(function(err, todos) {

            if (err) {
                return res.send(err);
            }

            res.json(todos);
        });
    });

    // create todo and get all todos after creating todo
    app.post('/api/todos', function(req, res) {

        Todo.create({
            text: req.body.text,
            done: false
        }, function(err, todo) {

            if (err) {
                return res.send(err);
            }

            Todo.find(function(err, todos) {

                if (err) {
                    return res.send(err);
                }

                res.json(todos);
            });
        });
    });

    // delete todo once checked
    app.delete('/api/todos/:todo_id', function(req, res) {

        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {

            if (err) {
                return res.send(err);
            }

            Todo.find(function(err, todos) {

                if (err) {
                    return res.send(err);
                }

                res.json(todos);
            });
        });
    });

    app.get('*', function(req, res) {
        res.sendFile(`${__dirname}/public/index.html`);
    });
};
