const express = require('express');
const app = express();
const connection = require('./database/db')
const bodyParser = require('body-parser');
const notifier = require('node-notifier');
const session = require('express-session');
const crypto = require('crypto');

const secretKey = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));

const PORT = 3200;

app.use(express.static('public'));

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/AddUser', (req, res) => {
    res.render('AddUser');
})

app.get('/Transfer', (req, res) => {
    const query = "SELECT * FROM users";
    connection.query(query, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to fetch users for tarnsfer page" });
            return;
        }

        res.render('Transfer', { users: result });
    });
});

app.get('/TransHisto', (req, res) => {
    // const transferData = req.session.transferData;
    const qr = `SELECT * FROM History`;
    connection.query(qr, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to fetch History Data'});
            return;
        }
        res.render('TransHisto', {histo: result });
    });
});

app.get('/ChooseUser', (req, res) => {
    const id = req.query.id;

    const userQuery = `SELECT * FROM users WHERE id = ${id}`;
    const otherUsersQuery = `SELECT * FROM users WHERE id <> ${id}`;

    connection.query(userQuery, (error, userResult) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to fetch user for ChooseUser page' });
            return;
        }

        connection.query(otherUsersQuery, (error, otherUsersResult) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to fetch other users for ChooseUser page' });
                return;
            }

            res.render('ChooseUser', { user: userResult[0], otherUsers: otherUsersResult });
        });
    });
});


app.get("*", (req, res) => {
    res.send("<h1>404 NOT FOUND</h1>");
});

app.post("/AddUser", (req, res) => {
    const { name, email, mobile, amount } = req.body;
    console.log(name, email, mobile, amount);

    const queryCheck = "SELECT * FROM users WHERE email = ? OR mobile = ?";
    connection.query(queryCheck, [email, mobile], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to add user..." });
            return;
        }
        if (result.length > 0) {
            console.log("User Already Exists");
            res.status(500).json({ error: "User Already Exist" });
        }
        else {
            const queryInsert = `INSERT INTO users(name, email, mobile, amount) VALUES(?, ?, ?, ?)`;
            connection.query(queryInsert, [name, email, mobile, amount], (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error: "Failed to add user" });
                    return;
                }
                console.log("User Added Successfully");
                notifier.notify({
                    title: 'User Added Successfully',
                    message: 'User has been added successfully.',
                });
                res.redirect('Transfer');
            })
        }
    });
});


app.post('/ChooseUser', (req, res) => {
    const id = req.body.id;
    const chosenUserId = req.body.Choose;
    const amount = req.body.amount;
    const currentDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const q = `SELECT name FROM users WHERE id IN (${id}, ${chosenUserId})`;
    connection.query(q, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to fetch user names" });
            return;
        }
        const [user1, user2] = results.map(result => result.name);
        const q1 = `INSERT INTO History(Sender, Receiver, Amount, Date) VALUES('${user1}','${user2}',${amount}, '${currentDate}')`;
        const values = [currentDate];
        connection.query(q1, [user1, user2, amount, currentDate], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to Pass user Data to History"});
                return;
            }
        });
    });

    // req.session.transferData = {
    //     s_no: s_no,
    //     user1: user1,
    //     user2: user2,
    //     amount: amount,
    //     currentDate: currentDate
    // };
    // });

    const q2 = `SELECT amount FROM users WHERE id = ${id}`;
    connection.query(q2, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to fetch user amount for check" });
            return;
        }
        if (results[0].amount < amount) {
            notifier.notify({
                title: 'Insufficient Balance',
                message: 'You do not have sufficient balance to make this transaction.',
            });
            return;
        }
        const queryupdate = `UPDATE users
        SET amount = CASE
          WHEN id = ${chosenUserId} THEN amount + ${amount}
          WHEN id = ${id} THEN amount - ${amount}
        END
        WHERE id IN (${chosenUserId}, ${id})`;

        // console.log(chosenUserId, amount);  

        connection.query(queryupdate, [id, amount], (error, result) => {

            if (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to Transfer user" });
                return;
            }
            console.log("Transfer Money Successfully");
            notifier.notify({
                title: 'Transfer Money',
                message: 'Transfer Money Successfully...',
            });
            res.redirect('TransHisto');
        });
    });
});

app.listen(PORT, () => {
    console.log("Server Is Started on Port:  ", PORT)
});