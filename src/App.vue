<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">VitaeExpress</router-link>
      <button @click="toggleMenu" class="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <ul
        :class="{'block': menuOpen, 'hidden': !menuOpen}"
        class="absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0 md:flex md:space-x-6 md:items-center">
        <li><router-link to="/" class="block py-2 md:py-0 hover:underline">Início</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/register" class="block py-2 md:py-0 hover:underline">Registrar-se</router-link></li>
        <li v-if="isAuthenticated">
          <router-link to="/profile" class="block py-2 md:py-0 hover:underline">Meu Currículo</router-link>
        </li>
        <li v-if="!isAuthenticated">
          <button @click="goToLogin" class="w-full text-left md:w-auto py-2 md:py-1 hover:underline focus:outline-none bg-blue-700 px-4 rounded">
            Login
          </button>
        </li>
        <li v-if="isAuthenticated">
          <button @click="logout" class="w-full text-left md:w-auto mt-2 md:mt-0 py-2 md:py-1 hover:underline focus:outline-none bg-red-600 px-4 rounded">
            Sair
          </button>
        </li>
      </ul>
    </nav>

    <main class="flex-grow" :class="{
        'flex flex-col justify-center items-center bg-blue-50': isFullPageLayout,
        'container mx-auto px-4 py-6': !isFullPageLayout
      }">
      <router-view />
    </main>

    <footer class="bg-gray-100 text-center py-4 text-gray-600">
      © 2025 VitaeExpress. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      isAuthenticated: false,
    };
  },
  computed: {
    isFullPageLayout() {
      const fullPageRoutes = ['/', '/login', '/register'];
      return fullPageRoutes.includes(this.$route.path);
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToLogin() {
      this.menuOpen = false;
      this.$router.push('/login');
    },
    logout() {
      this.menuOpen = false;
      localStorage.removeItem('token');
      this.updateAuth();
      this.$router.push('/');
    },
    updateAuth() {
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  },
  mounted() {
    this.updateAuth();
  },
  watch: {
    $route() {
      this.updateAuth();
      this.menuOpen = false;
    }
  }
};
</script>