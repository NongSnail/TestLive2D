<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <div id="canvasContainer"></div>
    </div>

    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100">
        <h1 class="text-xl md:text-5xl font-bold leading-tight mt-4">
          Register
        </h1>

        <form class="mt-6" @submit.prevent="registerUser">
          <div class="mt-4">
            <label class="block text-gray-700">Name</label>
            <input
              v-model="name"
              type="text"
              placeholder="Enter your name"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-600 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter Email Address"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-600 focus:bg-white focus:outline-none"
              autofocus
              autocomplete
              required
            />
          </div>

          <div class="mt-4">
            <label class="block text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter Password"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-600 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Enter Password"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-600 focus:bg-white focus:outline-none"
              required
            />
          </div>

          <div class="mt-6 pt-4 flex items-center space-x-4">
            <router-link
              to="/"
              class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              class="bg-blue-600 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { LAppDelegate } from '../../logic/lappdelegate';
import * as LAppDefine from '../../logic/lappdefine';
import { LAppGlManager } from '../../logic/lappglmanager';

export default {
  mounted() {
    console.log('Register page mounted!');
    if (
      !LAppGlManager.getInstance() ||
      !LAppDelegate.getInstance().initialize()
    ) {
      return;
    }

    LAppDelegate.getInstance().run();
  },
  name: "RegisterPage",
};
</script>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();

const registerUser = async () => {
  try {
    const response = await fetch("http://localhost:7000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        passwordConfirm: confirmPassword.value,
      }),
    });

    if (response.ok) {
      alert("Registration successful! Please log in.");
      router.push("/");
    } else {
      const data = await response.json();
      alert(data.detail);
    }
  } catch (error) {
    alert("An error occurred during registration: " + error.message);
  }
};
</script>
