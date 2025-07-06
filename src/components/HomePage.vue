<template>
  <div>
    <h1 class="text-4xl font-extrabold mb-6 text-blue-700 text-center px-4">
      Bem-vindo ao VitaeExpress
    </h1>
    <p class="mb-10 text-lg text-gray-700 text-center px-4">
      Crie e compartilhe seu currículo de forma simples e profissional.
    </p>
    <div class="flex justify-center">
      <router-link
        to="/register"
        class="block w-full max-w-xs py-3 rounded-lg bg-green-600 text-white text-lg font-semibold text-center shadow-lg hover:bg-green-700 transition-transform transform hover:-translate-y-1"
      >
        Comece Agora (É Grátis!)
      </router-link>
    </div>
  </div>
</template>