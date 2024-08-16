<script setup>
import Header from '../components/Layout/Header.vue';
import Footer from '../components/Layout/Footer.vue';
</script>
<template>
    <Header />
    <main role="main" class="container min-vh-75">
      <router-view />
    </main>
    <Footer />
</template>