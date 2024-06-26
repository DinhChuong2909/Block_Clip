const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger.json';
const endpointsFiles = ['./index.js']; // root file where the route starts.

const doc = {
    info: {
        version: "1.0.0",
        title: "BlockClip BackEnd",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3001",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Collection",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "token",
            in: "header",       // can be "header", "query" or "cookie"
            name: "Bearer",  // name of the header, query parameter or cookie
            description: "Your auth token"
        }
    },
    definitions: {
        Collection: {
            id: "65ad028c06897c23ec8bbba1",
            collectionID: null,
            creator: "0xCf56d1C5b9f0ac7dCaE5399e5f82f29066d978bc",
            chainID: "97",
            title: "Han is the 10111",
            title_lowercase: "han is the 10111",
            description: "fs",
            bannerURL: "public\\top1_bxv.jpg",
            averagePrice: 0,
            totalViews: 0,
            category: "Du lịch",
            paymentType: "0",
            contractAddress: "0xA9b666d1D6b86cBa297C21dB46E7056351970b70",
            active: true,
            disabled: false,
            createdAt: "2024-01-21T11:39:56.714Z",
            updatedAt: "2024-01-21T11:39:56.714Z"
        },
        // User: {
        //     name: "Jhon Doe",
        //     age: 29,
        //     parents: {
        //         $ref: '#/definitions/Parents'
        //     },
        //     diplomas: [
        //         {
        //             school: "XYZ University",
        //             year: 2020,
        //             completed: true,
        //             internship: {
        //                 hours: 290,
        //                 location: "XYZ Company"
        //             }
        //         }
        //     ]
        // },
        // AddUser: {
        //     $name: "Jhon Doe",
        //     $age: 29,
        //     about: ""
        // }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');           // Your project's root file
})