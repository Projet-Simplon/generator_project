const MongoClient = require('mongodb').MongoClient;
const fs = require('fs').promises;
const express = require('express');
const URL_MONGODB = 'mongodb://localhost:27017';
const app = express()
let students = [];

const main = async l => {
    try {
        //Lire mon Json
        const buffer = await fs.readFile('students.json');
        const studentsName = await JSON.parse(buffer);
        // console.log(studentsName[21].name);

        app.use(express.urlencoded({extended: true}));
        //Me connecter à la DB
        const client = await MongoClient.connect(URL_MONGODB, {useNewUrlParser: true, useUnifiedTopology: true });
        const db = await client.db('classRoom');

        //Créer ma db et insérer mes données json
        for (i = 0; i < studentsName.length; i++){
            // db.collection('students').insertOne(studentsName[i]);
            students.push(studentsName[i].name);
        }
        // db.createCollection('groups');

        app.get('/students', function (req, res) {
            res.send(students);
        })

        app.post('/studentss', async (req, res) => {
            res.send(students);
        })

        app.post('/students', function (req, res) {
            const myrep = req.body.name;
            for (i = 0; i < myrep.length; i++) {
                db.collection("Students").insertOne({name: myrep[i]});
            }
            // console.log(myrep);
            // db.collection("Students").insertOne({name: myrep}, (err, result) => {
            //     if (err) throw err
            //     console.log(result)
            //     res.send("lol")
            // })
        })

        app.delete('/students/:name', async (req, res) => {
            var paramName = req.params.name;
            await db.collection("Students").deleteOne({name: paramName})
            // for (i = 0; i < paramName; i++) {
            //     db.collection("Students").remove
            // }
            // if (params.toLowerCase() === Element.name.toLocaleLowerCase()) {
            // }
        })
          
        app.listen(8080, function () {
            console.log('Example app listening on port 8080!')
        })

    } catch (e) {
        console.log(e);
    }
};

main();










// console.log("MDR"); //

// const MongoClient = require('mongodb').MongoClient;
// const fs = require('fs').promises;
// const fetch = require('node-fetch');

// async function my_func() {
//     const URL_MONGODB = "mongodb://localhost:27017"
//     const client = new MongoClient(URL_MONGODB, {useUnifiedTopology: true})
//     await client.connect()
//     var mydb = client.db('classRoom')
    
//     let students = await fs.readFile('students.json', 'utf-8');
//     let my_parsed_students = await JSON.parse(students);
//     let studentName = [];

//     for (let i=0; i < my_parsed_students.length; i++) {
//         var classRoom = my_parsed_students[i]
//         mydb.collection('Students').insertOne(classRoom)
//         // console.log(my_parsed_students[i]);
//     }
// }
// my_func();




