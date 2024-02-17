<template>
  <div id="canvasContainer"></div>
</template>

<script>
import { MotionGroupIdle, MotionGroupTapBody, PriorityForce, PriorityIdle, PriorityNormal } from "../../logic/lappdefine";
import { LAppLive2DManager } from "../../logic/lapplive2dmanager";
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

export async function speakAssistantResponse(content) {
  const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

  const ssml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="th-TH"><voice name="th-TH-PremwadeeNeural"><prosody pitch="+50.00%">${content}</prosody></voice></speak>`;
  const requestHeaders = new Headers();
    requestHeaders.set('Content-Type', 'application/ssml+xml');
    requestHeaders.set('X-Microsoft-OutputFormat', 'riff-8khz-16bit-mono-pcm');
    requestHeaders.set('Ocp-Apim-Subscription-Key', key);

  const response = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: requestHeaders,
      body: ssml
    });

    const blob = await response.blob();

    var url = window.URL.createObjectURL(blob);
    // const url = blob;
    console.log(url);
    // return url;
    const audio = document.getElementById('voice');
    audio.src = url;
    audio.play();
    const lappl2dman = LAppLive2DManager.getInstance();
    const tororoModel = lappl2dman.getModel(0);
    tororoModel._wavFileHandler.start(url);
    // console.log(tororoModel._wavFileHandler)
    tororoModel.startMotion(
                'Idle',
                2,
                PriorityForce,
                lappl2dman._finishedMotion
              );
    // console.log('URL', await blob.arrayBuffer());
    setTimeout(() => window.URL.revokeObjectURL(url), 3000);
  // }

  // speechSynthesizer.speakSsmlAsync(
  //   ssml,
  //   (result) => {
  //     speechSynthesizer.close();
  //     result.audioData;
  //   },
  //   (error) => {
  //     console.error("Speech synthesis error:", error);
  //     alert("Speech synthesis error. Please try again.");
  //     speechSynthesizer.close();
  //   },
  // );
}
</script>
