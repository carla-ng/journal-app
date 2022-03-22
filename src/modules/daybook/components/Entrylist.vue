<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Search entry"
      />
    </div>

    <div class="entry-scrollarea">
      <Entry
        v-for="item in 100" :key="item"
      />
    </div>

  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Entry: defineAsyncComponent( () => import('../components/Entry.vue') )
  }
}
</script>

<style lang="scss" scoped>

.entry-list-container {
  border-right: 1px solid #2c3a50;
  height: calc( 100vh - 56px);

  input {
    height: 40px;
  }

  .entry-scrollarea {
    height: calc( 100vh - 110px );
    margin-top: 10px;
    overflow: scroll;
  }
}

</style>
