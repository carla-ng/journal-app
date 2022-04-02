<template>
  <button
    class="btn btn-primary"
    @click="$emit('on:click')"
  >
      <i class="fa fa-2x" :class="icon"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'fa-plus'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
button {
    border-radius: 100%;
    
    position: fixed;
    bottom: 20px;
    right: 20px;

    height: 80px;
    width: 80px;
}
</style>