require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const cors = require ('cors')
const app = express() 
const Person = require('./models/person')

app.use(express.static('build'))
app.use (express.json())
app.use(cors())

morgan.token ('bodyOutput', (request, result) =>
                                                {
                                                  if (request.method === "POST") return JSON.stringify(request.body)
                                                  else return ''
                                                }
             )

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyOutput'))




app.get ('/', (request, response) =>
                                    {
                                      response.send('<h1> Hello World! </h1>')
                                    }
        )

app.get ('/api/persons', (request, response, next) =>
                                                    {
                                                      Person.find({})
                                                            .then (people => response.json(people))
                                                            .catch(error => next(error))
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

app.delete('/api/persons/:id', (request, response, next) =>
                                                      {
                                                        Person.findByIdAndDelete(request.params.id)
                                                              .then(result =>
                                                                            {
                                                                              response.status(204).end()
                                                                            } 
                                                                   )
                                                              .catch(error => next(error))
                                                      }
          )



app.post ('/api/persons', (request, response, next) =>
                                              {
                                                const body = request.body
                                                if (!body.name || !body.phone)
                                                {
                                                  return response.status(400)
                                                                 .json({error: "no name or no phone provided"})
                                                }
                                                Person.find({})
                                                      .then(people => 
                                                                      {
                                                                        console.log(people)
                                                                        if (people.map(person => person.name.toLocaleLowerCase())
                                                                                   .findIndex(personName => {return body.name.toLocaleLowerCase() === personName})
                                                                                   !== -1
                                                                           )
                                                                        {
                                                                          response.status(400)
                                                                                  .json ({error: "name must be unique"})
                                                                          throw new Error ("name has to be unique!")
                                                                        }
                                                                        const person = new Person (
                                                                                                    {
                                                                                                      name: body.name,
                                                                                                      phone: body.phone
                                                                                                    }
                                                                                                  )
                                                                        return person.save()
                                                                      }
                                                           )
                                                      .then (savedPerson => {
                                                                              response.json(savedPerson)
                                                                            })
                                                      .catch(error =>next(error))
                                              } 
         )


const unknownEndpoint = (request, response) => 
                                              {
                                                response.status(404)
                                                        .send({ error: 'unknown endpoint' })
                                              }

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => 
                                                        {
                                                          console.log (error.message,'handler')
                                                          if (error.name === 'CastError')
                                                          {
                                                            return response.status(400).send({error: 'malformatted id'})
                                                          }
                                                          next(error)
                                                        }

app.use (errorHandler)                                                        

const port = process.env.PORT
app.listen (port, () => 
                        {
                          console.log (`App running on port ${port}`)
                        }
            )