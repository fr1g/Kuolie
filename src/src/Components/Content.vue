<template>
    <div class=" w-full m-auto p-1.5 md:p-5 grid justify-items-center transition-all" ref="rend" id="ROUND">
        <div :class="`  bg-${this._()}-200 text-${this._(1)}-800 relative
                    rounded-lg shadow-md transition w-5/6 p-5 hover:shadow-lg m-5 grid grid-cols-1 gap-3`" id="CORAL" 
                    style="max-width: 1955px;">
          
            <h1 class="px-1.5 flex w-full flex-wrap"  style="height: 36.5px;">
                <div class="grow">
                    <input id="INPUT" v-model="titlePass" ref="titl" style="height: 36.5px;" type="text" :class="'  w-full inline-block overflow-x-visible text-3xl border-0 outline-1 bg-transparent transition '" placeholder="点击输入标题文本..." />
                    <span id="OUTPUT" style="height: 36.5px;" class="text-3xl hidden   w-full transition"  v-html="(this.titlePass.length > 0 ? this.titlePass : '无标题之Kuolie.kami.su~').replaceAll(this.reg, '').replaceAll(this.regFrame, '')"></span>
                </div>
                <div class=" w-fit block -top-1 -right-1 select-none text-sm scale-50 md:scale-90 " :style="this.Config.showInfo.stat ? `opacity: .3;` : `display: none !important; --tw-scale-x: .65; --tw-scale-y: .65; `">
                    {{ this.watermark }}
                </div>
            </h1>
            <div id="bs" ref="texts" :style="`--id-show: ${this.Config.squareId.stat ? 'block' : 'hidden'};`" 
                :class="` gap-2.5 transition-all 
                    ${Config.waterfall.stat ? '' : 'grid grid-cols-12 '}
                    ${Config.flowDense.stat ? 'grid-flow-dense' : ''} 
                    ${Config.colsAuto.stat ? 'auto-cols-auto' : ''}  
                    ${Config.rowsAuto.stat ? 'auto-rows-auto' : ''}  
                    
                    `">
                <TextBox v-for="s of this.TextBoxes"
                         :x="s.x"   
                         :key="GetPosition(s)" 
                         :id="GetPosition(s)" 
                         :displayId="(ignorePID ? s.id : GetPosition(s))"
                         :offset="Config.waterfall.stat ? s.offset : -1" 
                         :span="s.span" 
                         :inside="s.content"
                         :fill="Config.waterfall.stat ? false : Config.fill.stat"
                         :isPlaceHolder="s.isPlaceHolder"
                         :self="s"
                         :showingBlockId="Config.squareId.stat"
                         :isMasonry="Config.waterfall.stat"
                />
                <!-- need minimize -->
            </div>
        </div>
    </div>
</template>
<script>
import TextBox from './TextBox.vue';
import Macy from 'macy';

export default{
    name: 'Content',
    inject: {_: "_", __: "__", Focus: 'Focus'},
    components: {
        TextBox,
    },
    mounted(){ 
        this.ignorePID = localStorage.ignorePID == 'true';
        window.addEventListener('blur', () => {
            PushToast('正在保存');
            this.Save();
        });
        window.addEventListener('keydown', (e) => {
            if(e.key == 's' && (e.metaKey || e.ctrlKey)){
                e.preventDefault();
                
                this.Save();
            } 
        });
        PushToast('尝试读取');
        this.Read();

        this.$nextTick(() => {
            this.UpdateSorting();
        });  
        setInterval(() => {
            this.InitMacy();
        }, 5000);
    },
    provide(){
        return{
            Add: this.Create,
            Del: this.Remove,
            Upd: this.Modify,
            Con: this.Configure, 
            Get: this.GetPosition,
            Seek: this.GetByIndex,
            Focus: this.PassFocus,

        }
    },
    data(){
        return {
            reg: /<script[^>]*?>[^]*?<\/script>/gi,
            regFrame: /<iframe[^>]*?>[^]*?<\/iframe>/gi,

            macy: null,
            cols: 4,
            ignorePID: (localStorage.ignorePID == 'true'),
            Config: {
                waterfall: {
                    name: '瀑布流*',
                    key: 'waterfall',
                    stat: (localStorage.masonry ?? 'false') == 'true',
                },                
                fill: {
                    name: '填满',
                    key: 'fill',
                    stat: true,
                },
                showInfo: {
                    name: '水印',
                    key: 'showInfo',
                    stat: true
                },
                squareId: {
                    name: '块编号',
                    key: 'squareId',
                    stat: true,
                },



                flowDense: {
                    name: '填补',
                    key: 'flowDense',
                    stat: false,
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
            },
            ExchangeTemp: {},
            TextBoxes: [
                //
            ],
            showId: true,
            watermark: '使用Kuolie.kami.su生成',
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
            ],
            titlePass: '',
            separate: 0,
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
        PassFocus(b){return this.Focus(b);},
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
                    localStorage.masonry = val;
                    console.log(val)
                    if(val == true)
                        PushToast('实验性功能！每五秒钟会刷新一次布局，<br>如果实在出现了块重叠，请使用占位方块辅助。', 'bg-indigo-300', 3, 5637);
                    else{
                        this.Save();
                        PushToast('由于可能界面出现紊乱，即将在三秒内刷新页面。', 'bg-indigo-300', 3, 5637);
                        setTimeout(() => {
                            Three();
                        }, 1234);
                    }
                    
                    break;

                case 'fill':
                    this.Config.fill.stat = val;
                    break;

                case 'showInfo':
                    this.Config.showInfo.stat = val;
                    break;

                case 'squareId':
                    this.Config.squareId.stat = val;
                    break;

                default: 
                    return this.Config;
            }
            this.$forceUpdate();
            this.InitMacy();
        },
        Create(placeholder = false){
            let prepare = this.Prepare();
            this.UpdateSorting();
            prepare.id = this.TextBoxes.length; // ...
            if(placeholder) prepare.isPlaceHolder = true;
            this.TextBoxes.push(prepare);
            this.UpdateSorting();
            setTimeout(() => {                
                let di = this.GetPosition(prepare);
                document.getElementById(`TEXTBOX::${di}`).click();
                document.getElementsByTagName('textarea')[0].focus();
                Scroll(`TEXTBOX::${di}`);
            }, 123);   
            this.InitMacy();
            return;
            
        },
        Remove(id = 'default'){
            if(id === 'default'){
                console.error('Require ID!');
                return;
            }
            if(id == 'all'){
                this._deleteAll();

            }else{
                PushToast(`删除了「${id}」, 但是如果先前保存过, 那在窗口失焦触发保存之前, <br>仍然可以通过快速按下键盘上的F5进行刷新以恢复...`, 'bg-zinc-300', 1, 5600);
                this._delete(id);
            }
            this.UpdateSorting();
        },
        _deleteAll(){
            this.TextBoxes = [];
        },
        _delete(position){
            // this.TextBoxes = this.TextBoxes.filter(i => i.id != id); // !!!
            this.TextBoxes.splice(position, 1);
            this.InitMacy();
        },
        Modify(place, change = 'default', changeCol = null){ // ?????
            if(change === 'default'){
                console.error('Require ID!');
                return;
            }
            else if(this.Config.waterfall.stat && (changeCol ?? false)){
                this.cols = change.span;
                localStorage.masonryCols = this.cols;
                this.InitMacy();
                return this.cols;
            }
            else if(change.id == null){
                PushToast('没有选中编辑项目.<br>为此, 新块已添加.', 'bg-sky-300');
                return;
            }
            else{
                this.UpdateSorting();
                this.TextBoxes[this.GetPosition(change)]
                let _tmp = this.TextBoxes[place], _change = change; // !!!
                if(this.Config.waterfall.stat) _change.span = this.TextBoxes[place].span;
                this.TextBoxes[this.TextBoxes.indexOf(_tmp)] = _change;
                this.$forceUpdate();
            }
            this.InitMacy();
            Scroll(`TEXTBOX::${change.id}`);
        },
        Save(){
            this.UpdateSorting();
            if(this.$refs.titl != undefined) 
                localStorage.setItem('kuolieTitle', this.titlePass);
            if(this.TextBoxes.length != 0 || this.TextBoxes != this.defaultTextBoxes)
                {
                    sessionStorage.History += `###${localStorage.kuolieJson}###:`
                    localStorage.lastEdit = localStorage.kuolieJson;
                    localStorage.setItem('kuolieJson', JSON.stringify(this.TextBoxes));
                }
            PushToast('保存完毕.');
            this.InitMacy();
        },
        Read(){
            let _yield = '未能找到记录: ';
            if(localStorage.kuolieJson) this.TextBoxes = JSON.parse(localStorage.kuolieJson);
            else _yield += '文本 ';
            if(localStorage.kuolieTitle) this.titlePass = localStorage.kuolieTitle;
            else _yield += ' 标题';
            if(_yield.includes('文本') || _yield.includes('标题')) PushToast(_yield);
            else PushToast('已经从以下来源载入: <br>本地缓存 (localStorage)');
            if(_yield.includes('文本')) setTimeout(() => {
                this.TextBoxes = this.defaultTextBoxes;
                PushToast('载入默认组...');
            }, 567);
            this.InitMacy();
        },
        GetPosition(item = null){
            if (item === null) return this.TextBoxes.length;
            else return this.TextBoxes.indexOf(item);
        },
        GetByIndex(index){
            return this.TextBoxes[index];
        },
        UpdateSorting(){ 
            this.separate = 0;
            this.TextBoxes.filter((x)=>{ x != null });
            for(let ind = 0; ind < this.TextBoxes.length; ind++)
                if(!this.TextBoxes[ind].isPlaceHolder) this.TextBoxes[ind].id = this.separate ++;
            this.InitMacy(); // can be simplified here
            this.$forceUpdate();
        },
        MoveTo(from, to){ // obj, position, return updated id.
            if(to < 0 || to > this.TextBoxes.length) {
                PushToast('OutOfRange', 'warn');
                return this.GetPosition(from);
            } // to refuse out-ranged item
            this.ExchangeTemp = this.TextBoxes[from];
            this.TextBoxes[from] = this.TextBoxes[to];
            this.TextBoxes[to] = this.ExchangeTemp;
            this.ExchangeTemp = {};
            this.UpdateSorting();
            return to;
        },
        InitMacy(){
            if(this.Config.waterfall.stat){
                this.macy = new Macy({
                    container: '#bs',
                    trueOrder: true,
                    columns: parseInt(`${localStorage.masonryCols ?? this.cols}`),
                    margin: 3

                });
            }else this.macy = null;
            this.$forceUpdate(); // ???

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