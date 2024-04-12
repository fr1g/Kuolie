<template>
    <span class="use-icon select-none" v-html="`&#x${this.$slots.default[0].text};`"></span>
</template>
<script>

export default{
    name: 'Icon',
}
</script>