<template>
    <div class="modal-view">
        <div class="text-3xl font-bold modal-view">渲染设置</div>
        <p></p>
        <br>

        <div ref="loading" class="modal-view">
            加载配置中...
        </div>
        <div class=" overflow-x-hidden overflow-y-scroll " style="max-height: 30.33vh;">
            <div class="modal-view  text-xl font-semibold">
                全局设置 
                <br>
                <span class="text-base font-normal">
                    设置将会保存在localStorage缓存. 部分可能要求刷新.
                </span>
            </div>
            <div class="toggle modal-view grid grid-cols-3 p-1.5 gap-1.5">
                <div :class="`modal-view border rounded-lg grid grid-cols-3 gap-1 p-1.5 bg-opacity-60  bg-${_()}-50 shadow hover:shadow-md transition-all `"  v-for="i of global" :key="i.name">
                    <span class=" p-1.5 block w-fit font-semibold col-span-2 h-fit align-bottom m-auto modalx -translate-y-0.5">{{ i.name }}</span>
                    <div class="modalx text-right">
                        <Press :class="` ${i.confirmed == undefined ? '' : (i.confirmed ? 'bg-red-500' : 'bg-red-300')}    p-1.5 w-fit mt-0.5 scale-90 modal-view-x border-zinc-700 border-2 shadow-none hover:shadow-none active:shadow-none inline-block`" 
                        :overclass="`shadow-none hover:shadow-none active:shadow-none   ${i.confirmed == undefined ? '' : (i.confirmed ? 'bg-red-500' : 'bg-red-300')}   `"
                         @click.native="Configure(i.key, !i.stat)" :style="i.confirmed == undefined ? '--tw-bg-opacity: 0' : '--tw-bg-opacity: .7'" init-opacity="70" >
                            <Icon class="modal-view  translate-y-0.5">{{ i.stat == null ? (i.confirmed ? 'e814' : 'e7b5') : (i.stat ? 'f78c' : 'f78a') }}</Icon>
                        </Press>
                    </div>
                    <span class="modalx p-0.5  inline-block col-span-full text-sm scale-95">
                        {{ i.desc }}
                    </span>
                </div>
            </div>

            <div class="modal-view font-semibold text-lg mt-1">
                渲染区设置
                <br>
                <span class="text-base font-normal bg-opacity-70">
                    设置将会在页面刷新后恢复默认. 
                </span>
            </div>
            <div class="toggle modal-view grid grid-cols-3 p-1.5 gap-1.5">
                <div :class="`modalxxx px-0.5 flex flex-wrap  modal-view border rounded-lg bg-opacity-60   bg-${_()}-50 shadow hover:shadow-md transition-all `"  v-for="i of conf" :key="i.name">
                    <span class="grow pl-1.5 block modalx translate-y-0.5">{{ i.name }}</span>
                    <Press class="w-fit modal-view-x  shadow-none hover:shadow-none active:shadow-none block" overclass="shadow-none hover:shadow-none active:shadow-none" @click.native="Config(i.key, !i.stat)" style="--tw-bg-opacity: 0">
                        <Icon class="modal-view text-xl scale-150 translate-y-0.5">{{ i.stat ? 'f19f' : 'f19e' }}</Icon>
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
    inject: {
        Config: 'Config', 
        RealDel: 'RealDel', 
        _: '_'
    },
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
            changedNeedRefresh: false,
            global: {
                playCDN: {
                    name: 'PlayCDN',
                    key: 'playCDN',
                    desc: '启用Tailwind Play CDN以供在渲染区使用动态的TailwindCSS. 该设置需要刷新页面.',
                    stat: (localStorage.usePlayCDN == 'true'),
                    needRefresh: true,
                },
                removeAll: {
                    name: '清空方块',
                    key: 'removeAll',
                    desc: '删除已有的全部块, 在触发失焦保存前仍然有机会恢复. 按钮需要第二次点击来确认.',
                    needRefresh: false,
                    stat: null,
                    confirmed: false,
                },
                idIgnorePlaceholder: {
                    name: '忽略占位',
                    key: 'idIgnorePlaceholder',
                    desc: '忽略占位方块，仅为文字方块启用编号。该设置需要刷新页面',
                    needRefresh: true,
                    stat: (localStorage.ignorePID == 'true'),

                }
            }
        }
    },
    methods: {
        Configure(key, val = null){
            switch(key){
                case 'playCDN':
                    PushToast('似乎这是需要刷新生效的设置! 将在后3秒内刷新页面... ', 'warn');
                    this.global.playCDN.stat = val;
                    localStorage.usePlayCDN = `${val}`;
                    // if() I WANT TO dynamicly get item to config!!!
                    this.changedNeedRefresh = true;
                    Three();
                    break;

                case 'removeAll':
                    if(this.global.removeAll.confirmed){
                        this.RealDel('all');
                    }else{
                        this.global.removeAll.confirmed = true;
                    }
                    break;

                case 'idIgnorePlaceholder':
                    PushToast('似乎这是需要刷新生效的设置! 将在后3秒内刷新页面... ', 'warn');
                    this.global.idIgnorePlaceholder.stat = val;
                    localStorage.ignorePID = `${val}`;
                    // if() I WANT TO dynamicly get item to config!!!
                    this.changedNeedRefresh = true;
                    Three();
                    break;

                default: 
                    return this.Config;
            }
            // this.$forceUpdate();
        },
    },
    beforeDestroy(){
        // return Three();
    }
}

</script>
<style scoped>
.modal-view-x > *{
    pointer-events: none !important;
}
</style>