const mongoose = require ('mongoose')

if (process.argv.length < 3)
{
  console.log ('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.6qpyo.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema(
                                         {
                                           name: String,
                                           phone: String
                                         }
                                        )

const Person  = mongoose.model ('Person', personSchema)

if (process.argv[3] && process.argv[4])
{
  const person = new Person (
    {
      name: process.argv[3],
      phone: process.argv[4]
    }
  )
  person.save()
        .then (result =>
                      {
                        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
                        mongoose.connection.close()
                      }
              )
} else if (!process.argv[3] && !process.argv[4])
{
  Person.find({})
  .then (result => 
                  {
                    console.log ('phonebook:')
                    result.forEach(person => console.log(person.name, person.phone))
                    mongoose.connection.close()
                  }
        )
} else if (!process.argv[3] || !process.argv[4])
{
  console.log (`You didn't provide name or phone number. Try again.`)
  mongoose.connection.close()
} 

