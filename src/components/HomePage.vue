<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-blue-50">
    <h1 class="text-4xl font-extrabold mb-6 text-blue-700">Bem-vindo ao VitaeExpress</h1>
    <p class="mb-10 text-lg text-gray-700">Crie e compartilhe seu currículo de forma simples e profissional.</p>
    <div class="flex flex-col gap-4 w-full max-w-xs">
      <router-link
        to="/register"
        class="block w-full py-3 rounded-lg bg-green-600 text-white text-lg font-semibold text-center shadow hover:bg-green-700 transition"
      >
        Comece Agora (É Grátis!)
      </router-link>
    </div>
  </div>
</template>