const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port= process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getYear' ,()=> {
  return new Date().getFullYear()
})

app.use((req,res, next)  => {
  const path = req.path;
  const time = new Date().toString();
  fs.appendFile('log.txt', time + path + '\n');
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs')
// });

//help from public dir.
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.send({
    name: 'Adi',
    age: 34,
    city: 'Bat-Yam'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    name: 'Adi'
  });
  console.info(req.path);
});

app.get('/welcome', (req, res) => {
  res.render('welcome.hbs', {
    title: 'Welcome to my demo!'
  })
});


app.listen(3000, () => console.info(`Magic happens on port ${port}`));