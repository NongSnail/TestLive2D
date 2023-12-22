<template>
  <footer class="fixed bottom-0 left-0">
    <audio controls autoplay loop ref="audioElement">
      <source
        src="../../assets/x2mate.com - Poem of the Clouds - Beautiful Piano Music for Relaxation｜BigRicePiano (128 kbps).mp3"
        type="audio/mpeg"
      />
    </audio>
  </footer>
</template>

<script>
export default {
  name: "Music",
  mounted() {
    this.$refs.audioElement.volume = 0.5;
  },
};
</script>

<style>
body {
  background-color: #f9f9f9;
  font: normal 1em / 1.5em BlinkMacSystemFont, -apple-system, "Segoe UI", roboto,
    helvetica, arial, sans-serif;
}

h1 {
  font-size: 1.5em;
  color: #555;
  text-align: center;
}

audio {
  display: block;
  margin: auto;
}
</style>
