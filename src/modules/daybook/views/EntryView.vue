<template>
  
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
          <span class="text-success fs-3 fw-bold">{{ day }}</span>
          <span class="mx-1 fs-3">{{ month }}</span>
          <span class="mx-2 fs-4 fw-light">{{ yearAndDay }}</span>
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
      <textarea v-model="entry.text" placeholder="What happened today?"></textarea>
    </div>

    <img
        src="https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="entry-picture"

        class="img-thumbnail">
  </template>

  <Fab icon="fa-save" />
  
</template>


<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    components: {
      Fab: defineAsyncComponent( () => import('../components/Fab.vue') )
    },
    data() {
      return {
        entry: null
      }
    },
    computed: {
      ...mapGetters('journal', ['getEntryById']),
      day() {
        const { day } = getDayMonthYear( this.entry.date )
        return day
      },
      month() {
        const { month } = getDayMonthYear( this.entry.date )
        return month
      },
      yearAndDay() {
        const { yearAndDay } = getDayMonthYear( this.entry.date )
        return yearAndDay
      }
    },
    methods: {
      loadEntry() {
        const entry = this.getEntryById( this.id )

        if ( !entry ) return this.$router.push({ name: 'no-entry' })
        this.entry = entry
      }
    },
    created() {
      this.loadEntry()
    },
    watch: {
      id() {
        this.loadEntry()
      }
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