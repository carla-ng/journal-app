<template>
  <div class="home" style="margin: 50px;">
    <h1>Journal App</h1>
    <button @click="goToDaybook" class="btn btn-primary" style="margin-top: 12px;">Go to journal</button>
  </div>
</template>

<script>

export default {
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    }  
  }
}

</script>

