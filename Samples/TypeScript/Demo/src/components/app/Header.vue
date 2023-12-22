<template>
  <header>
    <div class="flex justify-between items-center">
      <div>
        <div
          class="text-white p-4 text-5xl font-normal font-['Inter'] leading-[67.20px] drop-shadow-[0_5.2px_5.2px_rgba(0,0,0,0.8)]"
        >
          Virtual Book Recommendation Assistant
        </div>
      </div>
      <div class="flex items-center">
        <img
          class="w-[41px] h-[37px] drop-shadow-[0_5.2px_5.2px_rgba(0,0,0,0.8)]"
          src="../../assets/logout-512.png"
        />
        <div
          @click="handleLogout"
          class="text-right text-white text-xl font-normal font-['Inter'] leading-[67.20px] mr-2 drop-shadow-[0_5.2px_5.2px_rgba(0,0,0,0.8)]"
        >
          Logout
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

async function handleLogout() {
  const confirmLogout = window.confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    try {
      const response = await fetch("http://localhost:7000/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        await router.push("/");
      } else {
        const data = await response.json();
        alert(data.detail);
      }
    } catch (error) {
      alert("An error occurred during logout: " + error.message);
    }
  }
}
</script>

<style>
body {
  background-image: url("../../assets/137931-anime-landscape-library-nature.jpg");
  background-position: center;
}
</style>
