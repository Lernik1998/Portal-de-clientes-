<template>
    <q-page>
        <q-btn @click="router.push('/login')">Iniciar sesión</q-btn>
    </q-page>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script> 
<style scoped>
</style>