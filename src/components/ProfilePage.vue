<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
    <div v-if="loading" class="text-center">Carregando dados do perfil...</div>
    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Meu Currículo</h1>
        <div class="flex flex-wrap gap-2">
          <button @click="openEmailModal" class="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition">
            Enviar por E-mail
          </button>
          <button @click="exportToPDF"
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition mr-2">
            Baixar PDF
          </button>
          <button @click="saveCV" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
            Salvar Alterações
          </button>
        </div>
      </div>

      <form @submit.prevent="saveCV" class="space-y-8">
        <div class="p-6 bg-white rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">Dados Pessoais</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input v-model="cv.fullName" placeholder="Nome Completo" class="border rounded p-2 w-full" required />
            <input v-model="cv.email" type="email" placeholder="E-mail de Contato" class="border rounded p-2 w-full"
              required />
            <input v-model="cv.phone" v-maska data-maska="(##) #####-####" placeholder="Telefone"
              class="border rounded p-2 w-full" />
            <input v-model="cv.address" placeholder="Endereço (Ex: Cidade, Estado)" class="border rounded p-2 w-full" />
          </div>
        </div>

        <div class="p-6 bg-white rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">Resumo Profissional</h2>
          <textarea v-model="cv.professionalSummary" placeholder="Fale um pouco sobre sua carreira..."
            class="border rounded p-2 w-full h-24"></textarea>
        </div>

        <div class="p-6 bg-white rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">Experiências Profissionais</h2>
          <div v-for="(exp, index) in cv.experiences" :key="index" class="space-y-3 mb-4 border p-4 rounded">
            <input v-model="exp.title" placeholder="Cargo" class="border rounded p-2 w-full" />
            <input v-model="exp.company" placeholder="Empresa" class="border rounded p-2 w-full" />
            <input v-model="exp.period" placeholder="Período (Ex: Jan 2020 - Dez 2022)"
              class="border rounded p-2 w-full" />
            <textarea v-model="exp.description" placeholder="Descrição das atividades"
              class="border rounded p-2 w-full h-20"></textarea>
            <button @click.prevent="removeExperience(index)" class="text-red-500 hover:text-red-700">Remover
              Experiência</button>
          </div>
          <button @click.prevent="addExperience" class="mt-2 text-blue-600 hover:text-blue-800">+ Adicionar
            Experiência</button>
        </div>

        <div class="p-6 bg-white rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 border-b pb-2">Formação Acadêmica</h2>
          <div v-for="(edu, index) in cv.education" :key="index" class="space-y-3 mb-4 border p-4 rounded">
            <input v-model="edu.institution" placeholder="Instituição de Ensino" class="border rounded p-2 w-full" />
            <input v-model="edu.degree" placeholder="Curso / Grau" class="border rounded p-2 w-full" />
            <input v-model="edu.period" placeholder="Período" class="border rounded p-2 w-full" />
            <button @click.prevent="removeEducation(index)" class="text-red-500 hover:text-red-700">Remover
              Formação</button>
          </div>
          <button @click.prevent="addEducation" class="mt-2 text-blue-600 hover:text-blue-800">+ Adicionar
            Formação</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-6 bg-white rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Habilidades</h2>
            <textarea v-model="skillsAsText"
              placeholder="Liste suas habilidades separadas por vírgula (Ex: JavaScript, Vue.js, Liderança)"
              class="border rounded p-2 w-full h-24"></textarea>
          </div>
          <div class="p-6 bg-white rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4 border-b pb-2">Links</h2>
            <input v-model="cv.links.linkedIn" placeholder="URL do seu LinkedIn"
              class="border rounded p-2 w-full mb-2" />
            <input v-model="cv.links.github" placeholder="URL do seu GitHub" class="border rounded p-2 w-full mb-2" />
            <input v-model="cv.links.portfolio" placeholder="URL do seu Portfólio" class="border rounded p-2 w-full" />
          </div>
        </div>

      </form>

      <div class="mt-8 p-6 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 border-b pb-2">Compartilhar Resumo do Currículo</h2>
        <div class="flex flex-wrap gap-4">
          <button @click="share('linkedin')"
            class="bg-[#0077b5] text-white py-2 px-4 rounded hover:opacity-90 transition-opacity">LinkedIn</button>
          <button @click="share('twitter')"
            class="bg-[#1DA1F2] text-white py-2 px-4 rounded hover:opacity-90 transition-opacity">Twitter</button>
          <button @click="share('whatsapp')"
            class="bg-[#25D366] text-white py-2 px-4 rounded hover:opacity-90 transition-opacity">WhatsApp</button>
        </div>
      </div>

      <div v-if="showEmailModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
          <h3 class="text-lg font-bold mb-4">Enviar Currículo por E-mail</h3>
          <form @submit.prevent="sendEmail">
            <input v-model="recipientEmail" type="email" placeholder="E-mail do destinatário"
              class="border rounded p-2 w-full mb-4" required />
            <div class="flex justify-end gap-4">
              <button type="button" @click="showEmailModal = false"
                class="py-2 px-4 rounded bg-gray-200 hover:bg-gray-300">
                Cancelar
              </button>
              <button type="submit" :disabled="isSendingEmail"
                class="py-2 px-4 rounded bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-300">
                {{ isSendingEmail ? 'Enviando...' : 'Enviar' }}
              </button>
            </div>
          </form>
          <p v-if="emailStatusMessage" class="mt-4 text-center"
            :class="{ 'text-green-600': !emailError, 'text-red-600': emailError }">
            {{ emailStatusMessage }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import emailjs from '@emailjs/browser';

export default {
  data() {
    return {
      loading: true,
      cv: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        professionalSummary: "",
        skills: [],
        links: {
          linkedIn: "",
          github: "",
          portfolio: "",
        },
        experiences: [],
        education: [],
      },
      showEmailModal: false,
      recipientEmail: '',
      isSendingEmail: false,
      emailStatusMessage: '',
      emailError: false,
    };
  },
  computed: {
    skillsAsText: {
      get() {
        return this.cv.skills.join(', ');
      },
      set(value) {
        this.cv.skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
      }
    }
  },
  async created() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }
    try {
      const response = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.cv) {
        this.cv = { ...this.cv, ...response.data.cv };
      }
      if (!this.cv.fullName) this.cv.fullName = response.data.name;
      if (!this.cv.email) this.cv.email = response.data.email;

    } catch (error) {
      alert("Sessão expirada ou inválida. Por favor, faça login novamente.");
      localStorage.removeItem('token');
      this.$router.push("/login");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    addExperience() {
      this.cv.experiences.push({ title: '', company: '', period: '', description: '' });
    },
    removeExperience(index) {
      this.cv.experiences.splice(index, 1);
    },
    addEducation() {
      this.cv.education.push({ institution: '', degree: '', period: '' });
    },
    removeEducation(index) {
      this.cv.education.splice(index, 1);
    },

    async saveCV() {
      const token = localStorage.getItem("token");
      if (!this.cv.fullName || !this.cv.email) {
        alert("Nome completo e E-mail são obrigatórios.");
        return;
      }
      try {
        await axios.put("/api/users/me/cv", this.cv, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Currículo salvo com sucesso!");
      } catch (error) {
        alert("Erro ao salvar o currículo.");
      }
    },

    exportToPDF() {
      const doc = new jsPDF();
      let y = 15;

      doc.setFontSize(22);
      doc.text(this.cv.fullName, 105, y, { align: 'center' });
      y += 8;

      doc.setFontSize(10);
      const contactInfo = `${this.cv.email} | ${this.cv.phone} | ${this.cv.address}`;
      doc.text(contactInfo, 105, y, { align: 'center' });
      y += 10;
      if (this.cv.links.linkedIn) doc.text(`LinkedIn: ${this.cv.links.linkedIn}`, 10, y);
      y += 5;
      if (this.cv.links.github) doc.text(`GitHub: ${this.cv.links.github}`, 10, y);
      y += 10;

      const addSection = (title) => {
        doc.setFontSize(16);
        doc.text(title, 10, y);
        doc.setLineWidth(0.5);
        doc.line(10, y + 2, 200, y + 2);
        y += 10;
        doc.setFontSize(12);
      };

      if (this.cv.professionalSummary) {
        addSection("Resumo Profissional");
        const summaryLines = doc.splitTextToSize(this.cv.professionalSummary, 180);
        doc.text(summaryLines, 10, y);
        y += summaryLines.length * 5 + 5;
      }

      if (this.cv.experiences.length > 0) {
        addSection("Experiência Profissional");
        this.cv.experiences.forEach(exp => {
          doc.setFont(undefined, 'bold');
          doc.text(`${exp.title} - ${exp.company}`, 10, y);
          doc.setFont(undefined, 'normal');
          doc.text(exp.period, 10, y + 5);
          const descLines = doc.splitTextToSize(exp.description, 180);
          doc.text(descLines, 10, y + 10);
          y += 15 + descLines.length * 5;
        });
      }

      if (this.cv.education.length > 0) {
        addSection("Formação Acadêmica");
        this.cv.education.forEach(edu => {
          doc.setFont(undefined, 'bold');
          doc.text(edu.degree, 10, y);
          doc.setFont(undefined, 'normal');
          doc.text(`${edu.institution} - ${edu.period}`, 10, y + 5);
          y += 15;
        });
      }

      if (this.cv.skills.length > 0) {
        addSection("Habilidades");
        doc.text(this.cv.skills.join(', '), 10, y);
      }

      doc.save(`CV_${this.cv.fullName.replace(/\s/g, '_')}.pdf`);
    },
    share(platform) {
      let shareText = `✨ Meu Perfil Profissional ✨\n\n`;
      shareText += `Nome: ${this.cv.fullName}\n`;

      if (this.cv.professionalSummary) {
        shareText += `Resumo: ${this.cv.professionalSummary.substring(0, 150)}...\n\n`;
      }

      if (this.cv.experiences && this.cv.experiences.length > 0) {
        const lastExperience = this.cv.experiences[0];
        shareText += `Última Experiência: ${lastExperience.title} na ${lastExperience.company}\n`;
      }

      if (this.cv.skills && this.cv.skills.length > 0) {
        const topSkills = this.cv.skills.slice(0, 3).join(', ');
        shareText += `Principais Habilidades: ${topSkills}\n\n`;
      }

      shareText += `Criado com VitaeExpress!`;

      const encodedText = encodeURIComponent(shareText);
      let sharerUrl = '';

      switch (platform) {
        case 'linkedin':
          alert("Para compartilhar no LinkedIn, o texto do seu resumo foi copiado. Cole-o no post que será aberto.");
          navigator.clipboard.writeText(shareText);
          sharerUrl = 'https://www.linkedin.com/feed/?shareActive=true';
          break;
        case 'twitter':
          sharerUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
          break;
        case 'whatsapp':
          sharerUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
          break;
        default:
          return;
      }
      window.open(sharerUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
    },
    openEmailModal() {
      this.recipientEmail = '';
      this.emailStatusMessage = '';
      this.emailError = false;
      this.showEmailModal = true;
    },
    async sendEmail() {
      if (!this.recipientEmail) return;

      this.isSendingEmail = true;
      this.emailStatusMessage = '';

      try {
        const configResponse = await axios.get('/api/config/emailjs');
        const { serviceId, templateId, publicKey } = configResponse.data;

        const templateParams = {
          from_name: this.cv.fullName,
          to_email: this.recipientEmail,
          fullName: this.cv.fullName,
          email: this.cv.email,
          phone: this.cv.phone,
          professionalSummary: this.cv.professionalSummary,
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);

        this.emailStatusMessage = 'E-mail enviado com sucesso!';
        this.emailError = false;
        setTimeout(() => this.showEmailModal = false, 2000);

      } catch (error) {
        console.error('Falha ao enviar e-mail:', error);
        this.emailStatusMessage = 'Falha ao enviar o e-mail. Verifique a configuração.';
        this.emailError = true;
      } finally {
        this.isSendingEmail = false;
      }

    },
  },
};
</script>