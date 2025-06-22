<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-blue-50">
    <h1 class="text-4xl font-extrabold mb-6 text-blue-700">Bem-vindo ao nosso sistema</h1>
    <p class="mb-10 text-lg text-gray-700">Use o menu para navegar pelas páginas.</p>
    <div class="flex flex-col gap-4 w-full max-w-xs">
      <router-link
        to="/about"
        class="block w-full py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold text-center shadow hover:bg-blue-700 transition"
      >
        Sobre
      </router-link>
      <router-link
        to="/register"
        class="block w-full py-3 rounded-lg bg-green-600 text-white text-lg font-semibold text-center shadow hover:bg-green-700 transition"
      >
        Registrar-se
      </router-link>
    </div>
  </div>
</template>