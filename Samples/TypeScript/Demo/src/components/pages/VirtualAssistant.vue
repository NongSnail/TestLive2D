<template>
  <Chat />
  <Footer />
  <Header />
  <Live2d />
  <Music />
</template>

<script>
import Chat from "../app/Chat.vue";
import Footer from "../app/Footer.vue";
import Header from "../app/Header.vue";
import Live2d from "../app/Live2d.vue";
import Music from "../app/Music.vue";

export default {
  name: "VirtualAssistant",
  components: {
    Chat,
    Footer,
    Header,
    Live2d,
    Music,
  },
};
</script>
<!-- 
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  try {
    const token = localStorage.getItem("token");
    if (token === null) {
      alert("Redirecting to login");
      router.push("/");
    }
  } catch (e) {
    if (e.name == "TypeError") {
      alert("Redirecting to login");
      router.push("/");
    } else {
      throw e;
    }
  }
});
</script> -->
