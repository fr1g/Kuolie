<template>
    <div class="modal-ararararrara">
        <h1 class="text-2xl font-semibold">
            扩展颜色++
        </h1>
        <p>
            这里可以应用、创建和保存你的颜色方案, 包括主要背景、次要背景以及字体色调.
            <span class="text-red-400 font-semibold" v-if="localStorage.usePlayCDN !== 'true'">你需要在设置中启用PlayCDN, 这个功能才能正常工作!</span>
        </p>
    </div>
</template>
<script>
import Icon from '../Icon.vue';
import Press from '../Press.vue';

export default{
    name: 'ColorSuperModeModal',
    components: {Icon, Press},
    inject: [],
    mounted(){
        
    },  
    data(){
        return {

        }
    },
    methods: {
        handler(){
            if(this.clicked) {
                document.getElementById('DELCONFIRMBUTTON').innerHTML = '...';
                this.clicked = null;
                setTimeout(() => {
                    this.RD(this.toBeDeletedId);
                }, 321);
            }
            else this.clicked = true;
        }
    }
}

</script>
