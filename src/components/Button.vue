<script lang="ts" setup>

const { variant } = defineProps<{ variant: 'primary' }>()
console.log(variant)

</script>

<template>
    <button :class="`btn ${variant}`">
        <slot />
    </button>
</template>

<style lang="scss">
button.btn {
    display: flex;
    align-items: center;
    gap: .5rem;
    justify-content: center;
    padding: 7px 14px;
    border-radius: 5px;
    cursor: pointer;
    font-family: inherit;
    transition: all .2s ease-in-out;

    span {
        font-size: 1rem;
        margin-top: 4px;
        letter-spacing: 4px;
    }


    &.primary {
        background-color: #FF0000;
        color: #fff;
        border: #fff 1px solid;
        border-radius: 0.5rem;
    }

    &:hover {
        transform: scale(.96);
    }
}
</style>
