import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API BOARDIFY',
            version: '1.0.0',
            description: 'Documentacion API - Boardify',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/loginRoutes.js', './src/routes/*.js'],
};


// Docs on JSON Format
const swaggerSpec = swaggerJsdoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/api/docs.json', (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    });
    
    console.log(`API Documentation are available at /api/docs`)
}

export default swaggerDocs;
