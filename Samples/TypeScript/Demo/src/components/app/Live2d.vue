<template>
  <div id="canvasContainer"></div>
</template>

<script>
import { LAppDelegate } from "../../logic/lappdelegate";
import { LAppGlManager } from "../../logic/lappglmanager";

export default {
  mounted() {
    if (
      !LAppGlManager.getInstance() ||
      !LAppDelegate.getInstance().initialize()
    ) {
      return;
    }
    LAppDelegate.getInstance().run();
  },
  name: "Live2d",
};

const sdk = require("microsoft-cognitiveservices-speech-sdk");
const key = "8d959935a5324cd6af89d3be89088263";
const region = "southeastasia";

export function speakAssistantResponse(content) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

  const ssml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="th-TH"><voice name="th-TH-PremwadeeNeural"><prosody pitch="+50.00%">${content}</prosody></voice></speak>`;

  speechSynthesizer.speakSsmlAsync(
    ssml,
    (result) => {
      speechSynthesizer.close();
      result.audioData;
    },
    (error) => {
      console.error("Speech synthesis error:", error);
      alert("Speech synthesis error. Please try again.");
      speechSynthesizer.close();
    },
  );
}
</script>
