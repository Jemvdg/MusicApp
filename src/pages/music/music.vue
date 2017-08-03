<template>
    <div>
        <navTop></navTop>
         <router-view></router-view>
    </div>
</template>

<script>
import navTop from '../../components/J_navTop/navTop'
export default {
    components: {
        navTop,
    },
    data() {
        return {

        }
    }

}
</script>

<style lang="scss">

</style>
