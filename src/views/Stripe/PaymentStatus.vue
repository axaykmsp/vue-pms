<script setup>
import { useRoute } from 'vue-router'
const route = useRoute();
const message = route.name === 'StripeSuccess' ? 'Success' : 'Failed';
</script>
<template>
  <h1 class="mt-5">Stripe payment status {{ message }}</h1>
</template>