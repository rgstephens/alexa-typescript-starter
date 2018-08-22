import { ResponseInterceptor } from "ask-sdk-core";

export const SessionWillEnd: ResponseInterceptor = {
  async process(handlerInput, responseOutput) {
    console.log("SessionWillEnd, session:", handlerInput.requestEnvelope.session, ", responseOutput:", responseOutput);
    const requestType = handlerInput.requestEnvelope.request.type;
    let shouldEnd = true;
    if (responseOutput) {
      if (responseOutput.shouldEndSession) {
        shouldEnd = responseOutput.shouldEndSession
      }
      if (responseOutput.directives) {
        shouldEnd = false;
      }
    }

    if ((shouldEnd || requestType === "SessionEndedRequest") && (process.env.NODE_ENV !== 'test')) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      const persistentAttributes = (await handlerInput.attributesManager.getPersistentAttributes()) || {};
      console.log("SessionWillEnd, persistentAttributes:", JSON.stringify(persistentAttributes), ", sessionAttributes:", sessionAttributes);

      persistentAttributes.profile = sessionAttributes.profile;

      handlerInput.attributesManager.setPersistentAttributes(persistentAttributes);
      //console.log('calling savePersistentAttributes');
      await handlerInput.attributesManager.savePersistentAttributes();
    }
  }
};