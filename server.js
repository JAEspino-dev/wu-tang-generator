const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')


// an object of 3 objects, each object has a bank of first and last names
const names = {
  a: {
    first: ['Lead', 'Terracotta', 'Nostalgia'],
    last: ['Honeybee', 'cockroach', 'scorpion']
  },
  b: {
    first: ['Sleepytime', 'Fairy', 'Long'],
    last: ['Lionfish', 'Sunfish', 'tortoise']
  },
  c: {
    first: ['Janai', 'Aditi', 'Ezran'],
    last: ['snake', 'turtle', 'skink']
  },
}
// way to get random names from name bank:
function getRandomNameFromArrayThatIsNamePropertyOfObject(list) {
  return list[Math.floor(Math.random() * list.length)] // we get a random element from the array first and then the array last, // that's what this does: const finalWutangName = listTaker(group.first) + ' ' + listTaker(group.last) f2
}

// counter function: counts of how many times a,b,c show up and return the highest count as winner
function mostPicked(answers) { // try with reduce higher order array method
  const counts = { // this is a counting object
    a: 0, // box 1
    b: 0, // box 2
    c: 0 // box 3
  }
  answers.forEach(answer => { // try using reduce here with a ternary operator: 
    if (counts[answer] !== undefined) {
      counts[answer] += 1
    }
  })
  let winner = 'a';
  if (counts.b > counts[winner]) {
    winner = 'b'
  }
  if (counts.c > counts[winner]) {
    winner = 'c'
  }
  return winner // based off query parameter values, which come from the user's input
}

// template:
const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') { // need 5 parameters for 5 different inputs
    if ('q1' in params && 'q2' in params && 'q3' in params && 'q4' in params && 'q5' in params) { // not necessarily needed, but good practice
      const answer = [params.q1, params.q2, params.q3, params.q4, params.q5] // array of ['a','b','c']
      // need to find letter that appears most often:
      const letter = mostPicked(answer) // the function returns winner, which is the most occurring value in the url from the fetch/client side

      const group = names[letter] // using bracket notation to access the object in 

      const finalWutangName = getRandomNameFromArrayThatIsNamePropertyOfObject(group.first) + ' ' + getRandomNameFromArrayThatIsNamePropertyOfObject(group.last)

      res.writeHead(200, { 'Content-Type': 'application/json' });
      const objToJson = {
        finalWutangNameFromBackend: finalWutangName
      }
      res.end(JSON.stringify(objToJson));
    } 
    else {
      figlet('400!!', function (err, data) { // tells client malformed request
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
    }
  } 

  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/css/background.jpg') {
    fs.readFile('css/background.jpg', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});


server.listen(8000);




