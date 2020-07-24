const MongoClient = require('mongodb').MongoClient;
const fs = require('fs').promises;
const express = require('express');
const URL_MONGODB = 'mongodb://localhost:27017';

const main = async l =>{
    try {
        //Lire mon Json
        const buffer = await fs.readFile('students.json');
        const studentsName = await JSON.parse(buffer);
        console.log(studentsName[21].name);

        //Me connecter à la DB
        const client = await MongoClient.connect(URL_MONGODB, { useUnifiedTopology: true });
        const db = await client.db('classroom');

        //Créer ma db et insérer mes données json
        for(i = 0; i < studentsName.length; i++){
            db.collection('students').insertOne(studentsName[i]);
        }
        db.createCollection('groups');

    } catch (e) {
        console.log(e);
    }
};

main();

console.log("MDR");

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