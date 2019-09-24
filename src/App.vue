<template>
  <div>
    <img src="./assets/book.png" alt="">
    hello, vue
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(process.env.BASE_API)
  }
}
</script>