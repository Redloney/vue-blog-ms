<template>
    <div class="Home">
        <ElButton @click="link" type="primary">Login</ElButton>
    </div>
</template>

<script lang="ts">
import { ElButton } from 'element-plus';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'Home',
    components: {
        ElButton
    },
    setup() {
        const router = useRouter();

        const link = () => {
            router.push('/login');
        };

        return { link };
    }
});
</script>

<style lagn='scss' scoped>
.Home {
    width: 100vw;
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #eeeeee;
}
</style>