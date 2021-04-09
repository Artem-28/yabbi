<template>
  <section v-if="total > perPage" class="is-flex is-justify-content-center pb-6">
    <b-pagination
      :total="total"
      v-model="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <template #previous="props">
        <b-pagination-button :page="props.page">
          <i class="fas fa-arrow-left"></i>
        </b-pagination-button>
      </template>

      <template #next="props">
        <b-pagination-button :page="props.page">
          <i class="fas fa-arrow-right"></i>
        </b-pagination-button>
      </template>
    </b-pagination>
  </section>
</template>

<script>
export default {
  name: "Pagination",

  data() {
    return {
      total: this.$store.getters.paginate.total,
      current: this.$store.getters.paginate.current,
      perPage: this.$store.getters.paginate.perPage,
      rangeBefore: 3,
      rangeAfter: 1,
      order: "",
      size: "",
      isSimple: false,
      isRounded: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
    };
  },

  watch: {
    current: function () {
      this.$store.dispatch("PAGINATE", {
        current: this.current,
        perPage: this.perPage,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
