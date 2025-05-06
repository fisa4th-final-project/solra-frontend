<script setup>

</script>

<template>
  <div class="login-page">
    <div class="container left">
      <h1>S O L R A</h1>
    </div>
    <div class="container right">
      <div class="info-box">
        <h2 class="highlight">Welcome!</h2>
        <p>플랫폼을 이용하시려면 로그인해주세요.</p>
      </div>
      <div class="login-input">
        <form>
          <input type="text">
          <input type="password">
          <input type="submit">
        </form>
      </div>
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
</style>