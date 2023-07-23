<template>
  <div>
    <h1>{{ error?.response.data.error ?? error }}</h1>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({ error: Object })

</script>
