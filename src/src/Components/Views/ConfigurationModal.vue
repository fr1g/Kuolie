<template>
    <div class="modal-view">
        <div class="text-3xl font-semibold modal-view">渲染设置</div>
        <p>设置将会在页面刷新后恢复默认. </p>
        <br>

        <div ref="loading" class="modal-view">
            加载配置中...
        </div>
        <div class="grid grid-cols-3">
            <div class="grid grid-cols-2 modal-view gap-2 mb-2.5 " v-for="i of conf" :key="i.name">
                <div class="settings-item text-right modal-view h-min my-auto align-bottom">
                    {{ i.name }}
                </div>
                <div class="toggle text-left modal-view">
                    <Press class="w-fit modal-view-x" @click.native="Config(i.key, !i.stat)">
                        <Icon class="modal-view">{{ i.stat ? 'f78c' : 'f78a' }}</Icon>
                    </Press>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icon from '../Icon.vue';
import Press from '../Press.vue';

export default{
    name: 'ConfigurationModal',
    components: {Icon, Press},
    inject: ['Config'],
    mounted(){
        this.confGetInterval = setInterval(() => {
            if(!this.Config('get')) {
                console.log('failed to get config, keep trying...');
            }
            else {
                this.conf = Object.values(this.Config('get'));
                if(this.$refs.loading)
                    this.$refs.loading.remove();
                clearInterval(this.confGetInterval);
            }
            
        }, 1);
        
        this.$forceUpdate();
    },
    data(){
        return {
            conf: null,
            confGetInterval: null,
        }
    }
}

</script>
<style scoped>
.modal-view-x > *{
    pointer-events: none !important;
}
</style>