<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div
      class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"
    ></div>

    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100">
        <h1 class="text-4xl font-bold leading-tight">
          Welcome to Virtual Book Recommendation Assistant
        </h1>
        <h5
          class="text-x font-bold leading-tight mt-4 flex justify-center mt-5"
        >
          Share your interests, discover your next favorite book!
        </h5>
        <hr class="my-6 border-gray-300 w-full" />
        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-3">
          Log in to your account
        </h1>

        <form class="mt-6" @submit.prevent="Login">
          <div>
            <label class="block text-gray-700">Email Address</label>
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
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
              name="password"
              id="password"
              placeholder="Enter Password"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-600 focus:bg-white focus:outline-none"
              required
            />
          </div>

          <div class="text-right mt-2">
            <a
              href="#"
              class="text-sm font-semibold text-gray-700 hover:text-blue-600 focus:text-blue-600"
              >Forgot Password?</a
            >
          </div>

          <button
            type="submit"
            class="w-full block bg-blue-600 hover:bg-blue-600 focus:bg-blue-600 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Log In
          </button>
        </form>

        <hr class="my-6 border-gray-300 w-full" />

        <p class="mt-8">
          Need an account?
          <router-link
            to="/register"
            class="text-blue-600 hover:text-blue-600 font-semibold"
            >Create an account</router-link
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginPage",
};
</script>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

async function Login() {
  const credentials = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.access_token;

      localStorage.setItem("token", token);

      router.push("/VirtualAssistant");
    } else {
      const data = await response.json();
      alert(data.detail);
    }
  } catch (error) {
    alert("An error occurred during login: " + error.message);
  }
}
</script>
