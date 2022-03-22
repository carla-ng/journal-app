<template>
  <div class="entry-container pointer p-3">

      <div class="entry-title d-flex">
          <span class="text-success fs-5 fw-bold">15</span>
          <span class="mx-1 fs-5">July</span>
          <span class="mx-1 fs-5 fw-light">2022, Thursday</span>
      </div>

      <div class="entry-description">
            Nostrud ex veniam anim occaecat sint amet irure cupidatat enim cupidatat. Laboris magna irure nostrud duis elit eiusmod aute proident id. Tempor ullamco velit exercitation quis labore amet mollit irure nulla magna. Ipsum consectetur in quis id labore ea. Aliquip consequat quis proident consectetur occaecat officia do do mollit duis ad laborum. Aute deserunt minim est duis pariatur elit dolor fugiat ea enim incididunt ullamco.
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description {
        font-size: 12px;
    }
}
</style>