import * as Alexa from "ask-sdk-core";
import * as Intents from "./intents";
import * as Errors from "./errors";
import * as Interceptors from "./interceptors";
import * as HelloIntents from "./intents/hello";
import { DynamoDbPersistenceAdapter } from "./persistence";

//let dynamoDbPersistenceAdapter = new DynamoDbPersistenceAdapter({ tableName: "helloTable" });

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        // Intents.Debug,

        // Default intents
        Intents.Launch,
        Intents.Help,
        Intents.Stop,
        Intents.SessionEnded,
        Intents.SystemExceptionEncountered,
        Intents.Fallback,

        // Hello intents
        HelloIntents.HelloWorld
    )
    .addErrorHandlers(
        Errors.Unknown,
        Errors.Unexpected
    )
    .addRequestInterceptors(
        Interceptors.Localization,
        Interceptors.SessionStarted,
        Interceptors.Slots
    )
    .addResponseInterceptors(
        Interceptors.SessionWillEnd
    )
    .withPersistenceAdapter(new DynamoDbPersistenceAdapter({ tableName: "helloTable", partitionKeyName: "userId", attributesName: "mapAttr" }))
    .lambda();
