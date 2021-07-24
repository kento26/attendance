<template>
  <div class="setting">
    <div class="setting__row">
       <div class="setting__unit">
        <Delete />
      </div>

       <div class="setting__unit">
        <Edit />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'user',

    Delete: () => import('~/components/Delete'),
    Edit: () => import('~/components/Edit'),
  }
</script>

<style lang="scss" scoped>
  .setting {
    &__row {
      display: flex;
    }

    &__unit {
      width: 50%;
    }
  }
</style>
