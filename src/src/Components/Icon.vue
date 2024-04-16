<template>
    <span class="use-icon select-none  modal-content pointer-events-none translate-y-0.5 block align-middle" v-html="`&#x${this.$slots.default[0].text};`"></span>
</template>
<script>

export default{
    name: 'Icon',
}
</script>