<script setup>
  import Dialog from '@/components/common/Dialog.vue';
import { loginApi } from '@/lib/api/user/loginApi';
  import { ref } from 'vue'

  const visible = ref(false)
  const form = ref({
    userLoginId: '',
    password: ''
  });

  async function loginHandler() {
    const res = await loginApi({
      userLoginId: form.value.userLoginId,
      password: form.value.password
    }).finally(() => {
      form.value.userLoginId = '';
      form.value.password = '';
    });
  }
</script>

<template>
  <Dialog></Dialog>
  <div class="login-page">
    <div class="container left">
      <h1>S O L R A</h1>
    </div>
    <div class="container right">
      <div class="info-box">
        <h2 class="highlight">Welcome!</h2>
        <p>플랫폼을 이용하시려면 로그인해주세요.</p>
      </div>
      <v-form 
        @submit.prevent="loginHandler"
        class="login-form"
      >
        <div class="login-input">
          <div class="text-subtitle-1 text-medium">Account</div>

          <v-text-field
            placeholder="Username"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="form.userLoginId"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium d-flex align-center justify-space-between">
            Password
            <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot password?</a>
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"

            placeholder="Password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="form.password"
          ></v-text-field>

          <v-btn
            type="submit"
            class="mb-8"
            color="primary"
            size="large"
            variant="tonal"
            block
          >
            Log In
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<style scoped>
  .login-page {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
    height: 100%;
    padding: 0 60px;
    gap: 50px;
  }
  .left {
    background: linear-gradient(160deg, #0B192C  50%, #FF6500 100%);
    color: white;
  }
  .left h1 {
    font-size: 4rem;
  }
  .right {
    background-color: white;
    color: black;
  }
  .right h2 {
    font-size: 3rem;
  }
  .right p {
    font-size: 1.2rem;
  }
  .info-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
  .login-input {
    width: 100%;
  }
  .login-form {
    width: 100%;
  }
</style>