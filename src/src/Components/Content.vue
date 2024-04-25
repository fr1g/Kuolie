<template>
    <div class=" w-full m-auto p-5 grid justify-items-center transition-all" ref="rend" id="ROUND">
        <div :class="`  bg-${this._()}-200 text-${this._()}-800
                    rounded-lg shadow-md transition w-5/6 p-5 hover:shadow-lg m-5`" id="CORAL">
            <h1 class=" mb-2.5">
                <input ref="titl" type="text" :class="'w-full p-1.5 inline-block overflow-x-visible text-3xl border-0 outline-1 bg-transparent '" placeholder="点击输入标题文本..." />
            </h1>
            <div ref="texts" :style="`--id-show: ${this.showId ? 'block' : 'hidden'};`" 
                :class="`grid grid-cols-12 gap-2.5 transition-all   ${Config.flowDense.stat ? 'grid-flow-dense' : ''}  ${Config.colsAuto.stat ? 'auto-cols-auto' : ''}  ${Config.rowsAuto.stat ? 'auto-rows-auto' : ''}  `">
                <TextBox @click.native="Focus(s)" v-for="s of this.TextBoxes"
                         :ref="`TB_${s.id}`" 
                         :x="s.x"   
                         :key="s.id" 
                         :id="s.id" 
                         :offset="Config.waterfall.stat ? s.offset : -1" 
                         :span="s.span" 
                         :inside="s.content"
                         :fill="Config.fill.stat"
                         :isPlaceHolder="s.isPlaceHolder"
                />
            </div>
        </div>
    </div>
</template>
<script>
import TextBox from './TextBox.vue';

export default{
    name: 'Content',
    inject: {_: "_", __: "__", Focus: 'Focus'},
    components: {
        TextBox,
    },
    mounted(){
        window.addEventListener('blur', () => {
            PushToast('正在保存');
            this.Save();
        });
        PushToast('尝试读取');
        this.Read();

        this.$nextTick(() => {
            this.$forceUpdate();
        });  
    },
    provide(){
        return{
            Add: this.Create,
            Del: this.Remove,
            Upd: this.Modify,
            Con: this.Configure,
        }
    },
    data(){
        return {
            Config: {
                flowDense: {
                    name: '自动填补',
                    key: 'flowDense',
                    stat: true,
                },
                colsAuto: {
                    name: '自动列',
                    key: 'colsAuto',
                    stat: true,
                },
                rowsAuto: {
                    name: '自动行',
                    key: 'rowsAuto',
                    stat: true,
                },
                waterfall: {
                    name: '瀑布流',
                    key: 'waterfall',
                    stat: false,
                },                
                fill: {
                    name: '填满',
                    key: 'fill',
                    stat: false,
                },
            },
            TextBoxes: [
                //
            ],
            showId: true,
            defaultTextBoxes: [
            {
                    id: 0,
                    content: '<b class="text-6xl">你好! 欢迎使用Kuolie</b><br>这是一个帮你生成扩列图的工具哦! ',
                    span: 3,
                    offset: 0,
                    x: 0,
                    isPlaceHolder: false,
                },    
                {
                    id: 1,
                    content: '如果你有<i class="text-6xl">HTML</i>基础的话, 底部输入框可以供你突破一切纯文本限制! <br>快试试插入图片吧!',
                    span: 6,
                    offset: 0,
                    x: 0,
                    isPlaceHolder: false,
                },    
                {
                    id: 2,
                    content: 'Placeholder的内容不会展示... ',
                    span: 3,
                    offset: 0,
                    x: 0,
                    isPlaceHolder: true,
                }, 
                {
                    id: 3,
                    content: '[标题! 标题!]这个小工具会: <ul><li>自动保存 (窗口失焦)</li><li>自动读取 (localStorage)</li> </ul>所以除非清理了浏览器缓存否则内容一直都在喔! 此外, 标题插入方法已经在下方输入面板里介绍过啦! ',
                    span: 12,
                    offset: 0,
                    x: 0,
                    isPlaceHolder: false,
                },    
                {
                    id: 4,
                    content: '【Tailwind Yes!】另外, 这个工具使用了 <p class="font-semibold text-3xl">TailwindCSS Play CDN</p>所以你可以快捷引入样式!',
                    span: 5,
                    offset: 0,
                    x: 0,
                    isPlaceHolder: false,
                },
            ]
        }
    },
    methods: {
        Prepare(){
            return {
                    id: -1,
                    content: '',
                    span: 2,
                    offset: 0,
                    x: 0,
                    isPlaceHolder: false,
                };
        },
        Configure(key, val = null){
            switch(key){
                case 'flowDense':
                    this.Config.flowDense.stat = val;
                    break;

                case 'colsAuto':
                    this.Config.colsAuto.stat = val;
                    break;

                case 'rowsAuto':
                    this.Config.rowsAuto.stat = val;
                    break;

                case 'waterfall':
                    this.Config.waterfall.stat = val;
                    break;

                case 'fill':
                    this.Config.fill.stat = val;
                    break;

                default: 
                    return this.Config;
            }
            this.$forceUpdate();
        },
        Create(placeholder = false){
            let prepare = this.Prepare();
            this.UpdateSorting();
            prepare.id = this.TextBoxes.length;
            if(placeholder) prepare.isPlaceHolder = true;
            this.TextBoxes.push(prepare);
            this.UpdateSorting();
            setTimeout(() => {                
                document.getElementById(`TEXTBOX::${prepare.id}`).click();
                document.getElementsByTagName('textarea')[0].focus();
                Scroll(`TEXTBOX::${prepare.id}`);
            }, 123);   
            return;
            
        },
        Remove(id = 'default'){
            if(id === 'default'){
                console.error('Require ID!');
                return;
            }
            console.log(id);
            PushToast(`删除了「${id}」, 但是如果先前保存过, 那在窗口失焦触发保存之前, <br>仍然可以通过快速按下键盘上的F5进行刷新以恢复...`, 'bg-zinc-300', 1, 5600);
            this.TextBoxes = this.TextBoxes.filter(i => i.id != id);
            this.UpdateSorting();
        },
        Modify(change = 'default'){
            if(change === 'default'){
                console.error('Require ID!');
                return;
            }else if(change.id == null){
                PushToast('没有选中编辑项目.<br>为此, 新块已添加.', 'bg-sky-300');
                return;
            }else{
                this.UpdateSorting();
                let _tmp = Find(this.TextBoxes, change);
                this.TextBoxes[this.TextBoxes.indexOf(_tmp)] = change;
                this.$forceUpdate();
            }
            Scroll(`TEXTBOX::${change.id}`);
        },
        Save(){
            this.UpdateSorting();
            if(this.$refs.titl != undefined) localStorage.setItem('kuolieTitle', this.$refs.titl.value);
            if(this.TextBoxes.length != 0 || this.TextBoxes != this.defaultTextBoxes)
                localStorage.setItem('kuolieJson', JSON.stringify(this.TextBoxes));
            PushToast('保存完毕.');
        },
        Read(){
            let _yield = '未能找到记录: ';
            if(localStorage.kuolieJson) this.TextBoxes = JSON.parse(localStorage.kuolieJson);
            else _yield += '文本 ';
            if(localStorage.kuolieTitle) this.$refs.titl.value = localStorage.kuolieTitle;
            else _yield += ' 标题';
            if(_yield.includes('文本') || _yield.includes('标题')) PushToast(_yield);
            else PushToast('已经从以下来源载入: <br>本地缓存 (localStorage)');
            if(_yield.includes('文本')) setTimeout(() => {
                this.TextBoxes = this.defaultTextBoxes;
                PushToast('载入默认组...');
            }, 567);
        },
        UpdateSorting(){
            this.TextBoxes.sort((a, b) => { return a.id - b.id; });
            let ids = -1;
            for(let i of this.TextBoxes){
                ids++;

                let _prechange = Find(this.TextBoxes, i), _tmp;
                _tmp = _prechange;
                _tmp.id = ids;
                this.TextBoxes[this.TextBoxes.indexOf(_prechange)] = _tmp;
                
            }
            this.$forceUpdate();
            // console.log('已重新排序');

        },
    },
    watch: {
        TextBoxes(){
            // this.UpdateSorting();
        }
    }
}
</script>

<style scoped>
.x-gap > *{
    margin: .375rem;
}
</style>