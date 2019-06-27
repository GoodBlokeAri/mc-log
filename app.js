const express       = require('express')
const app           = express()
const port          = 3000
const path          = require('path');
const bodyParser    = require('body-parser')
const fs            = require('fs')


app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) 
{
    fs.readdir(path.join(__dirname, 'logs'), function (err, files)
    {
        if(err) console.log(err);

            fs.readFile(path.join(__dirname, 'logs/latest.log'), 'utf8', function(err, contents)
            {
                res.render('index',
                {
                    data: files,
                    content: contents
                });
            });
    });
})


app.post('/', function (req, res) 
{
    fs.readdir(path.join(__dirname, 'logs'), function (err, files)
    {
        if(err) console.log(err);

        fs.readFile(path.join(__dirname, 'logs/' + req.body.log), 'utf8', function(err, contents)
        {    
            res.render('index',
            {
                data: files,
                content: contents
            });
        });
    });

    console.log(`Log Selected: ${req.body.log}`);
})

app.listen(port, () => console.log(`🚀  Serving at: localhost:${port}!`))