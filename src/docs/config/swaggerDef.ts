import swaggerJsDoc from "swagger-jsdoc";
import * as  path from 'path'


const dir = path.join(__dirname, "..", '/')
const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Politico API",
            version: "1.0.0",
            description: "Politico API documentation"
        },
    },
    apis: [`${dir}/**/*.yaml`]
}

const swaggerDef =  swaggerJsDoc(swaggerOptions)
export default swaggerDef;