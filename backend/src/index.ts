// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import express from "express";
// import cors from "cors";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import  json  from "body-parser";
// import mongoose from "mongoose";
// import http from "http";
// import typeDefs from "./schemas/schema.js";
// import userResolvers from "./resolvers/userResolvers.js";
// import { MONGODB_URI } from "./config/environment.js";

// interface MyContext {
//     token?: string;
// }

// async function startApolloServer() {
//     const app = express();
//     const httpServer = http.createServer(app);

//     const server = new ApolloServer<MyContext>({
//         typeDefs,
//         resolvers: userResolvers,
//         plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//     });

//     await server.start();

//     try {
//         await mongoose.connect(MONGODB_URI!);
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log('Error connecting to MongoDB', error);
//         process.exit(1);
//     }

//     app.use(
//         '/graphql',
//         cors<cors.CorsRequest>(),
//         json(),
//         expressMiddleware(server, {
//             context: async ( { req } ): Promise<MyContext> => ( { token: req.headers.token as string}),
//         })
//     );

//     await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
//     console.log(`🚀 Server ready at httt://localhost:4000/graphq`);
// }

// startApolloServer().catch((err) => console.error('Error starting server', err));

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import typeDefs from "./schemas/schema.js";
import userResolvers from "./resolvers/userResolvers.js";
import { MONGODB_URI } from "./config/environment.js";

interface MyContext {
    token?: string;
}

async function startApolloServer() {
    // Apollo Server kurulumunu gerçekleştiriyoruz
    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers: userResolvers,
    });

    // MongoDB bağlantısı kuruluyor
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }

    // Apollo Server'ı başlatıp URL'i döndürüp sunucuyu ayağa kaldırıyoruz
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }): Promise<MyContext> => {
            return { token: req.headers.token as string };
        },
        listen: { port: 4001 }, // 4000 portunda dinleyecek
    });

    console.log(`🚀 Server ready at ${url}`);
}

startApolloServer().catch((err) => console.error('Error starting server', err));







