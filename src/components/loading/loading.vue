<template>
    <div class="loading">
        <img src="./loading2.gif">   
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.loading {
    position: fixed;
    top: 7.75rem;
    display: flex;
    width: 100%;
    height: 100vh;
    padding-top: 20vh;
    flex-direction: column;
    z-index: 999;
    background: #fff;
    text-align: center;
    img {
        width: 100%;
        transform: scale(1.5)
    }
}
</style>