<template>
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Crie sua Conta</h1>
    <p class="text-gray-600 mb-6 text-center">
      É rápido e fácil. Preencha seus dados para começar.
    </p>
    <form @submit.prevent="registerUser" class="flex flex-col gap-4">
      <input 
        v-model="name" 
        placeholder="Nome completo"
        class="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-200" required />
      <input 
        v-model="email" 
        type="email" 
        placeholder="Email"
        class="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-200" required />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Senha"
        class="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-200" required />
      <button 
        type="submit"
        class="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold">
        Registrar
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post("/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/profile"); 
      } catch (error) {
        alert("Erro ao registrar usuário. O e-mail pode já estar em uso.");
      }
    },
  },
};
</script>