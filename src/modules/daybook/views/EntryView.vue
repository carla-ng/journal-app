<template>
  <div class="entry-title d-flex justify-content-between p-2">
      <div>
          <span class="text-success fs-3 fw-bold">15</span>
          <span class="mx-1 fs-3">July</span>
          <span class="mx-2 fs-4 fw-light">2022, Thursday</span>
      </div>

      <div>
        <button class="btn btn-danger mx-2">
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary">
          Upload picture
          <i class="fa fa-upload"></i>
        </button>
      </div>
  </div>

  <hr>

  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="What happened today?"></textarea>
  </div>

  <Fab icon="fa-save" />

  <img
      src="https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      alt="entry-picture"
      class="img-thumbnail">

</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
        Fab: defineAsyncComponent( () => import('../components/Fab.vue') )
    }
}
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  font-size: 20px;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  position: fixed;
  bottom: 150px;
  right: 20px;

  box-shadow: 0 5px 10px rgba($color: #000, $alpha: 0.2);
  width: 200px;
}
</style>