<template>
    <div class="modal-ararararrara">
        <div class="text-3xl font-semibold modal-view">真的要删除吗? <br>
            <span class="text-xl">删除: #{{ this.target.replace('&#&', ' <') + '> ' }}</span>
        </div>
        <p>此操作无法撤销! (真的很久! ) <span class="opacity-40">ID: {{ toBeDeletedId }}</span></p>
        <div class="grid grid-cols-2 gap-2 mt-3">
            <Press overclass="text-center bg-red-500" @click.native="RD(toBeDeletedId)">是</Press>
            <Press overclass="text-center bg-slate-500" >否</Press>
        </div>
    </div>
</template>
<script>
import Icon from '../Icon.vue';
import Press from '../Press.vue';

export default{
    name: 'ConfirmDeletionModal',
    components: {Icon, Press},
    inject: ['RD'],
    props: ['target'],
    mounted(){
        this.toBeDeletedId = parseInt(this.target.replace('&#&', '').replace('#', ''));
    },  
    data(){
        return {
            toBeDeletedId: -1,
        }
    }
}

</script>
