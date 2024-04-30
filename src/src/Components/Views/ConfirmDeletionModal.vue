<template>
    <div class="modal-ararararrara">
        <div class="text-3xl font-semibold modal-view">真的要删除吗? <br>
            <span class="text-xl" :title="this.origin">删除: #{{ this.toBeDeletedId }} 
                「{{ this.origin.length > 12 ? `${this.origin.slice(0, 11)}...` : this.origin }}」</span>
        </div>
        <p>此操作无法撤销! (真的很久! ) <span class="opacity-10">ID: {{ toBeDeletedId }}</span></p>
        <div class="grid grid-cols-12 gap-2 mt-3 bg-opacity-60">
            <Press overclass="text-center font-semibold bg-slate-400 col-span-8" init-opacity="60">算了吧...</Press>
            <Press id="DELCONFIRMBUTTON" :overclass="`text-lg font-semibold block modal-xxx text-center ${this.clicked ? 'bg-red-500' : 'bg-red-300'}`"
             :disable="clicked == null ? 'true' : 'false'" class="col-span-4"
            is-for-modal-close="false" @click.native="handler"  init-opacity="60">
                {{ this.clicked ? '再次点击确认' : '是' }}
            </Press>
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
    props: ['target', 'origin'],
    mounted(){
        this.toBeDeletedId = parseInt(this.target);
    },  
    data(){
        return {
            toBeDeletedId: -1,
            clicked: false,
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
