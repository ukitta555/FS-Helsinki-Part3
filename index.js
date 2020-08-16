require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const cors = require ('cors')
const app = express() 
const Person = require('./models/person')


app.use(cors())
app.use (express.json())
app.use(express.static('build'))

morgan.token ('bodyOutput', (request, result) =>
                                                {
                                                  if (request.method === "POST") return JSON.stringify(request.body)
                                                  else return ''
                                                }
             )

             app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyOutput'))




let persons = [
  { 
    name: "Arto Hellas", 
    phone: "040-123456",
    id: 1
  },
  { 
    name: "Ada Lovelace", 
    phone: "39-44-5323523",
    id: 2
  },
  { 
    name: "Dan Abramov", 
    phone: "12-43-234345",
    id: 3
  },
  { 
    name: "Mary Poppendieck", 
    phone: "39-23-6423122",
    id: 4
  }
]

app.get ('/', (request, response) =>
                                    {
                                      response.send('<h1> Hello World! </h1>')
                                    }
        )

app.get ('/api/persons', (request, response) =>
                                              {
                                                Person.find({})
                                                      .then (people => response.json(people))
                                              }
        ) 

app.get ('/info', (request, response) =>
                                        {
                                          const currentDate = new Date()
                                          response.send(`<p> Phonebook has info for ${persons.length} people </p>
                                                    <p> ${currentDate} </p>
                                                  `) 
                                        }    
        )

app.get ('/api/persons/:id', (request, response) =>
                                                  {
                                                    const id = Number(request.params.id)
                                                    const person = persons.find (person => person.id === id)
                                                    if (person)
                                                    {
                                                      response.json (person)
                                                    } else 
                                                    {
                                                      response.status(404).end()
                                                    }
                                                    
                                                  }
        )

app.delete('/api/persons/:id', (request, response) =>
                                            {
                                              const id = Number (request.params.id)
                                              persons = persons.filter (person => person.id !== id)
                                              response.status(204).end()
                                            }
          )



app.post ('/api/persons', (request, response) =>
                                              {
                                                const person = request.body
                                                if (!person.name || !person.phone)
                                                {
                                                  return response.status(400)
                                                                 .json({error: "no name or no phone provided"})
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


const unknownEndpoint = (request, response) => 
                                              {
                                                response.status(404)
                                                        .send({ error: 'unknown endpoint' })
                                              }

app.use(unknownEndpoint)
const port = process.env.PORT || 3001
app.listen (port, () => 
                        {
                          console.log (`App running on port ${port}`)
                        }
            )