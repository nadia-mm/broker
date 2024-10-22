import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", 
    info: {
      title: "Broker API Documentation", 
      version: "1.0.0", 
      description: "Broker API documentation for my application", 
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./**/*.router.ts"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
