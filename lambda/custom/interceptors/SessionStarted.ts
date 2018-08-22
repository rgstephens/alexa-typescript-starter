import { RequestInterceptor } from "ask-sdk-core";

function initializeProfile() {
  return {
    email: "",
    mobile: "",
    location: {
      address: {
        city: "",
        state: "",
        zip: ""
      },
      timezone: ""
    }
  };
}

export const SessionStarted: RequestInterceptor = {
  async process(handlerInput) {
    if (handlerInput.requestEnvelope.session && handlerInput.requestEnvelope.session.new) {
      // get Session & Persistent attributes
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
      console.log("SessionStarted, persistentAttributes:", JSON.stringify(persistentAttributes), ", sessionAttributes:", sessionAttributes, ", requestEnvelope.session:", JSON.stringify(handlerInput.requestEnvelope.session));

      if (!persistentAttributes.profile) {
        console.log("SessionStarted, Initializing new profile...");
        sessionAttributes.newUser = true;
        sessionAttributes.profile = initializeProfile();
      } else {
        console.log("SessionStarted, Restoring profile from persistent store.");
        sessionAttributes.newUser = false;
        sessionAttributes = persistentAttributes;
      }
      console.log("SessionStarted, sessionAttributes:", sessionAttributes);
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    }
  }
};