
const express = require('express')

const cors = require('cors')

const fetch = require('cross-fetch')

const apiKey = require('./openaiapikey')

const app = express()

const port = process.env.PORT || 3005;

app.use(cors())

// middleware
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.post('/', (req, res) => {
 

    console.log("req todo value is" , req.body.user);

    const url = "https://api.openai.com/v1/chat/completions";
  
    fetch(url, {
        method: "POST",
        headers: {
         
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.api_Key}`,
          "Access-Control-Allow-Origin": "*",
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Write a usefull article regarding : ${req.body}`,
            },
          ],
        }),
      })
      .then(response => {
     console.log("Response is",response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred');
      });
  });

  app.listen(port ,() => {
    console.log("server is listening in the port" , port)
})
