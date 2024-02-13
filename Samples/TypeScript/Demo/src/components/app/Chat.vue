<template>
  <div
    class="w-full sm:w-[520px] h-auto sm:h-[520px] rounded-[50px] shadow flex-col justify-end items-end inline-flex absolute inset-y-20 right-0 shadow-2xl"
  >
    <div
      class="flex justify-between self-stretch p-3 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-t-lg"
    >
      <div
        class="text-center text-white text-3xl font-normal font-['Inter'] leading-[50px]"
      >
        Chat
      </div>

      <button
        class="self-stretch text-center text-black text-[15px] font-normal font-['Inter'] leading-[15px] items-center justify-center rounded-lg px-6 py-3 transition duration-500 ease-in-out bg-zinc-100 hover:bg-blue-400 focus:outline-none"
        @click="clearchat"
      >
        <span class="font-bold">Clear Chat</span>
      </button>
    </div>

    <div class="w-[520px] h-[520px] relative bg-white" id="chat-container">
      <div
        class="h-96 p-4 overflow-auto"
        id="chat-messages"
        ref="chatContainer"
      >
        <div
          class="h-30 px-6 py-2 overflow-auto"
          v-for="message in messages"
          :key="message.id"
        >
          <div
            :class="[
              'chat-bubble',
              message.role === 'assistant' ? 'float-left' : 'float-right',
            ]"
          >
            <div id="msg-content">
              <div class="" id="user-icon" v-if="message.role === 'user'">
                <img
                  src="../../assets/human-logo.jpg"
                  class="w-6 h-6 rounded-full float-right"
                />
                <p class="text-right">User</p>
                <p
                  class="bg-blue-600 text-white p-3 rounded-lg shadow-md"
                  id="msg"
                >
                  {{ message.content }}
                </p>
              </div>
              <div id="assistant-icon" v-if="message.role === 'assistant'">
                <img
                  src="../../assets/ai-bot-logo.jpg"
                  class="w-6 h-6 rounded-full float-left"
                />
                <p class="assistant-name">Assistant</p>
                <p class="bg-gray-300 p-3 rounded-lg" id="msg">
                  {{ message.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="self-stretch h-[65px] p-5 bg-gray-200 rounded-b-lg"
      id="chat-input"
    >
      <div
        class="self-stretch h-[20px] w-full pb-1 justify-between items-center inline-flex"
      >
        <div
          class="text-neutral-500 text-[15px] font-normal font-['Inter'] leading-tight flex-auto"
        >
          <input
            type="text"
            v-model="userQueryText"
            id="input-box"
            placeholder="Type a reply..."
            class="mt-2 rounded-md bg-white border-transparent focus:border-white bg-white focus:ring-0 w-9/12"
            @keyup.enter="handleUserSubmit"
          />

          <button
            type="button"
            @click="handleUserSubmit"
            id="send-button"
            class="inline-flex w-3/12 items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-600 hover:bg-blue-400 focus:outline-none"
          >
            <span class="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5 ml-2 transform rotate-90"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
};
</script>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { speakAssistantResponse } from "./Live2d.vue";

// const sdk = require("microsoft-cognitiveservices-speech-sdk");
// const key = "8d959935a5324cd6af89d3be89088263";
// const region = "southeastasia";

const userQueryText = ref("");
const chatContainer = ref(null);
const messages = reactive([]);
const token = localStorage.getItem("token");

// Clear the chat messages locally and on the server
function clearchat() {
  fetch("http://localhost:7000/api/delete_message", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        messages.length = 0;
        localStorage.removeItem("messages");
      } else {
        console.error("Failed to delete messages from the server");
      }
    })
    .catch((error) => {
      console.error("Error during delete request:", error);
      alert("Error during delete request. Please try again.");
    });
}

// Handle user message submission
function handleUserSubmit() {
  if (!userQueryText.value.trim()) {
    alert("Please enter a message");
    return;
  }

  scrollToBottom();

  const userMsg = {
    role: "user",
    content: userQueryText.value,
  };
  messages.push(userMsg);
  speakAssistantResponse(userQueryText.value);
  userQueryText.value = "";

  scrollToBottom();

  const assistantMsg = {
    role: "assistant",
    content: "Loading...",
  };
  messages.push(assistantMsg);
  scrollToBottom();

  const msg = {
    role: "user",
    content: userMsg.content,
  };

  try {
    fetch("http://localhost:7000/api/user_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(msg),
    })
      .then((response) => response.json())
      .then((data) => {
        const assistantResponse = {
          role: "assistant",
          content: data.content,
        };
        const index = messages.indexOf(assistantMsg);
        if (index !== -1) {
          messages.splice(index, 1, assistantResponse);
        }
        localStorage.setItem("messages", JSON.stringify(messages));

        speakAssistantResponse(data.content);
        scrollToBottom();
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert("Error during fetch. Please try again.");
      });
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred. Please try again.");
  }
}

// Speak assistant's response using speech synthesis
// function speakAssistantResponse(content) {
//   const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
//   const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

//   const ssml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="th-TH"><voice name="th-TH-PremwadeeNeural"><prosody pitch="+50.00%">${content}</prosody></voice></speak>`;
//   const requestHeaders = new Headers();
//     requestHeaders.set('Content-Type', 'application/ssml+xml');
//     requestHeaders.set('X-Microsoft-OutputFormat', 'riff-8khz-16bit-mono-pcm');
//     requestHeaders.set('Ocp-Apim-Subscription-Key', key);

//   const response = fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
//       method: 'POST',
//       headers: requestHeaders,
//       body: ssml
//     });

//     const blob = response.blob();

//     var url = window.URL.createObjectURL(blob)
//     return url;
//   }

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
// }

// Scroll to the bottom of the chat container
function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
}

// Retrieve chat history from the server and update messages
function historyMessage() {
  if (!token) {
    alert("Token not found in localStorage");
    return;
  }

  try {
    fetch("http://localhost:7000/api/history_message", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("messages", JSON.stringify(data.history_message));
        scrollToBottom();
      })
      .catch((error) => {
        console.error("Error during history fetch:", error);
        alert("Error during history fetch. Please try again.");
      });
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred. Please try again.");
  }
}

// Initialize component on mount
onMounted(() => {
  historyMessage();
  const previousMessage = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push(...previousMessage);
  scrollToBottom();
});

// Watch for changes in messages and scroll to the bottom
watch(messages, () => {
  scrollToBottom();
});
</script>
