<template>
  <Dialog></Dialog>
  <v-container height="100%">
    <v-row class="h-100" justify="center" align="center">
      <v-col cols="12" md="6" sm="12" lg="7">
        <h1>S O L R A</h1>
      </v-col>
      <v-col cols="12" md="6" sm="12" lg="5">
        <v-row no-gutters>
          <v-col cols="12">
            <span>Welcome!</span>
          </v-col>
          <v-col cols="12">
            <span>플랫폼을 이용하시려면 로그인해주세요.</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-form 
            @submit.prevent="loginHandler"
            class="login-form"
            >
              <span class="text-subtitle-1 text-medium">Account</span>
              <v-text-field
              placeholder="Username"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="form.userLoginId"
              />
              <span class="text-subtitle-1 text-medium d-flex align-center justify-space-between">
                Password
                <!-- <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
                >
                Forgot password?</a> -->
              </span>
              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                placeholder="Password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                v-model="form.password"
              />
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
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
import { loginApi } from '@/lib/api/user/loginApi';
  import { ref } from 'vue'

  const visible = ref(false)
  const form = ref({
    userLoginId: '',
    password: ''
  });

  async function loginHandler() {
    await loginApi({
      userLoginId: form.value.userLoginId,
      password: form.value.password
    }).finally(() => {
      form.value.userLoginId = '';
      form.value.password = '';
    });
  }
</script>