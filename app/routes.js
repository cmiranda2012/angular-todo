//routes
const Todo = require('./models/todo');

module.exports = function(app) {

    // get items
    app.get('/api/todos', function(req, res) {

        Todo.find({
            done: req.query.done
        }, function(err, active) {

            if (err) {
                return res.send(err);
            }

            res.json(active);
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

            Todo.find({
                done: false
            }, function(err, todos) {

                if (err) {
                    return res.send(err);
                }

                res.json(todos);
            });
        });
    });

    // updates done flag of given todo once checked
    app.put('/api/todos/:todo_id', function(req, res) {

        Todo.findOneAndUpdate({
            _id: req.params.todo_id
        }, {
            done: true
        }, function(err, todo) {

            if (err) {
                return res.send(err);
            }

            Todo.find({
                done: false
            }, function(err, todos) {

                if (err) {
                    return res.send(err);
                }

                res.json(todos);
            });
        });
    });

    // delete all completed items
    app.delete('/api/todos', function(req, res) {

        Todo.remove({
            done: true
        }, function(err) {

            if (err) {
                return res.send(err);
            }

            res.json({
                success: true,
                msg: 'All completed items deleted.'
            });
        });
    });

    app.get('*', function(req, res) {
        res.sendFile(`${__dirname}/public/index.html`);
    });
};
