<template>
    <div class="modalx">
        <h1 class="modalx text-xl font-bold">输入框说明/提示</h1>
        <h2 class="modalx text-lg font-semibold mt-1">自动补全</h2>
        <p class="modalx pl-1.5 border-l-2 border-opacity-30">
            
            输入框具有简单的输入补全, 可用于补全方括号和HTML标签以及图标标记 <code>%=&lt;PUA&gt;%</code>. 将会在按下等于号的时候触发补全. <br>
            按下回车将自动在html标签之外的地方插入换行符. <br>
            如果只希望编辑器中换行, 可以按住shift然后再按回车. <br>
            在开标签末尾或标签名后有一个空格的情况下输入等号将会补全一对引号并将输入光标转移到引号中.
            
        </p>
        <h2 class="modalx text-lg font-semibold mt-1">联动行为</h2>
        <p class="modalx pl-1.5 border-l-2 border-opacity-30">
            通过输入框编辑的文本, 可在选中的目标块里实时看到更新的渲染效果. <br>
            第一段被「方括号 ([] /【】)」包裹住的文字将成为块的标题, 此前的文字将被忽略. <br>
            如需要插入Segoe Fluent Icon到文本块里, 需要使用<code>%=&lt;PUA&gt;%</code>插入. <br>
            比如, %=e711%等价于&#xe711; / \ue711. <br>
            查询SFI PUA代码: <a class="a modala " style="pointer-events: all;" href="https://learn.microsoft.com/zh-cn/windows/apps/design/style/segoe-fluent-icons-font#pua-e700-e900" target="_blank">查看PUA映射表</a><br>
            使用%=n% 来插入多个空格, 将n替换为你需要的数量.<br>
            在按下回车时, 将自动插入一个<b>HTML换行符</b>到光标处.
        </p>
        <h2 class="modalx text-lg font-semibold mt-1">其他信息</h2>
        <p class="modalx pl-1.5 border-l-2 border-opacity-30">
            使用ctrl/command(⌘)+s保存, 或使窗口失焦以保存. <br>

        </p>
    </div>
</template>
