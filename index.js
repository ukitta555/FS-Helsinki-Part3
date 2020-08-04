const express = require ('express')
const app = express() 

app.use (express.json())


let persons = [
  { 
    name: "Arto Hellas", 
    number: "040-123456",
    id: 1
  },
  { 
    name: "Ada Lovelace", 
    number: "39-44-5323523",
    id: 2
  },
  { 
    name: "Dan Abramov", 
    number: "12-43-234345",
    id: 3
  },
  { 
    name: "Mary Poppendieck", 
    number: "39-23-6423122",
    id: 4
  }
]

app.get ('/', (req, res) =>
                          {
                            res.send('<h1> Hello World! </h1>')
                          }
        )

app.get ('/api/persons', (req, res) =>
                                    {
                                      res.json (persons)
                                    }
        ) 

app.get ('/info', (req, res) =>
                              {
                                const currentDate = new Date()
                                res.send(`<p> Phonebook has info for ${persons.length} people </p>
                                          <p> ${currentDate} </p>
                                        `) 
                              }    
        )

app.get ('/api/persons/:id', (req, res) =>
                                          {
                                             const id = Number(req.params.id)
                                             const person = persons.find (person => person.id === id)
                                             if (person)
                                             {
                                              res.json (person)
                                             } else 
                                             {
                                              res.status(404).end()
                                             }
                                             
                                          }
        )

app.delete('/api/persons/:id', (req, res) =>
                                            {
                                              const id = Number (req.params.id)
                                              persons = persons.filter (person => person.id !== id)
                                              res.status(204).end()
                                            }
          )

app.post ('/api/persons', (request, response) =>
                                              {
                                                const person = request.body
                                                if (!person.name || !person.number)
                                                {
                                                  return response.status(400)
                                                                 .json({error: "no name or no number provided"})
                                                }
                                                if (persons.map(person => person.name.toLocaleLowerCase())
                                                           .findIndex(entry => {return person.name.toLocaleLowerCase() === entry})
                                                           !== -1
                                                   )
                                                {
                                                  return response.status(400)
                                                                 .json ({error: "name must be unique"})
                                                }
                                                person.id = Math.floor(Math.random() * 100000)
                                                

                                                persons = persons.concat(person)

                                                console.log (person)
                                                console.log(persons)

                                                response.json (person)
                                              }
         )

const port = 3001
app.listen (port, () => 
                        {
                          console.log (`App running on port ${port}`)
                        }
            )