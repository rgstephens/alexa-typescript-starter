import { Resource } from "i18next";
import { Strings } from "./constants";

interface IStrings {
    [Strings.SKILL_NAME]: string;
    [Strings.WELCOME_MSG]: string;
    [Strings.GOODBYE_MSG]: string;
    [Strings.HELLO_MSG]: string;
    [Strings.HELP_MSG]: string;
    [Strings.ERROR_MSG]: string;
}

export const strings: Resource = {
    "en-US": {
        translation: {
            SKILL_NAME: "Hello world",
            WELCOME_MSG: "Welcome to the Alexa Skills Kit, you can say hello!",
            GOODBYE_MSG: "Goodbye!",
            HELLO_MSG: "Hello world!",
            HELP_MSG: "You can say hello to me!",
            ERROR_MSG: "Sorry, I can't understand the command. Please say again.",
        } as IStrings,
    },
};