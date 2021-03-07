module.exports = app => {
    const users = require("../controllers/user.controller.js");

    const redirectLogin = (req, res, next) => {
        if (!req.session.userId) {
          res.redirect("/login");
        } else {
            next();
        }
      };

    const redirectHome = (req, res, next) => {
        if (req.session.userId) {
            res.redirect("/home");
        } else {
            next();
        }
    };

    // login page
    app.get("/", (req, res)  => {

        const { userId } = req.session;

        res.send(`
            <h1>Welcome</h1>
            ${userId ? `
                <a href='/home'>Home</a>
                <form method='post' action='logout'>
                    <button>Logout</button>
                </form>
            ` : `
                <a href='/login'>Login</a>
                <a href='/register'>Register</a>
            `}

            
        `)
    });

    app.get("/home", redirectLogin, (req, res) => {
        res.send(`
            <h1>Home</h1>
            <h1>Welcome ${req.session.userId.username}</h1>
            <a href='/logout'>Logout</a>
        `);
    });

    app.get("/login", redirectHome, (req, res) => {
        res.send(`
            <h1>Login</h1>
            <form method='post' action='/login'>
                <input type='text' name='username' required />
                <input type='text' name='password' required />
                <input type='submit' name='userlogin' />
            </form>
            <a href='/register'>Register</a>
        `);

    });

    app.get("/register", redirectHome, (req, res) => {

        res.send(`
        <h1>Register</h1>
        <form method='post' action='/register'>
            <input type='text' name='username' required />
            <input type='password' name='password' required />
            <input type='submit' name='register' />
        </form>
        <a href='/login'>Login</a>
        `);
    });

    app.post("/register", redirectHome, users.register, (req, res) => {
        res.redirect("/home");
    });

    app.get("/logout", redirectLogin, (req, res) => {
        req.session.userId = null;
        res.redirect("/login");
    });


    // Login User
    app.post(`/login`, redirectHome, users.login, (req, res) => {
        res.redirect("/home");
    });
  };