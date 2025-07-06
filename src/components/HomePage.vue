<template>
  <div class="h-full flex flex-col justify-center items-center -my-6 -mx-4 bg-blue-50">
    <h1 class="text-4xl font-extrabold mb-6 text-blue-700 text-center px-4">
      Bem-vindo ao VitaeExpress
    </h1>
    <p class="mb-10 text-lg text-gray-700 text-center px-4">
      Crie e compartilhe seu currículo de forma simples e profissional.
    </p>
    <div class="flex flex-col gap-4 w-full max-w-xs">
      <router-link
        to="/register"
        class="block w-full py-3 rounded-lg bg-green-600 text-white text-lg font-semibold text-center shadow-lg hover:bg-green-700 transition-transform transform hover:-translate-y-1"
      >
        Comece Agora (É Grátis!)
      </router-link>
    </div>
  </div>
</template>