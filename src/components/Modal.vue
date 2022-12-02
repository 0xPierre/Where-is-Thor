<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    headText: string
    show: boolean
}>()

const showModal = ref(false)

const emit = defineEmits(['on-close', 'on-save'])

document.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
        emit('on-close')
    }
})


watch(() => props.show, () => {
    if (props.show) {
        showModal.value = true
    } else {
        setTimeout(() => {
            showModal.value = false
        }, 500)
    }
})

const emitClose = () => {
    emit('on-close')
}


</script>

<template>
    <Teleport to="body">
        <div v-show="showModal" :class="`modal-outer ${show ? 'open' : 'hide'}`">
            <div class="modal">
                <div class="modal-content">
                    <header>
                        <h4>{{ props.headText }}</h4>
                    </header>
                    <div class="content">
                        <slot />
                    </div>
                </div>
            </div>
            <div class="modal-backdrop" @click="emit('on-close')" />
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.modal-outer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    // display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    opacity: 0;
    color: #fff;

    // .modal {
    //     transform: translateY(-2000px);
    // }

    &.open {
        // display: block;
        visibility: visible;
        overflow-x: hidden;
        overflow-y: auto;
        opacity: 1;
        animation: showOpacity .2s ease-in;

        .modal {
            animation: showTranslate .2s ease-in;
        }
    }

    &.hide {
        animation: hideOpacity .2s ease-in;

        .modal {
            animation: hideTranslate .2s ease-in;
        }
    }

    .modal-backdrop {
        left: 0;
        background-color: #22292f;
        opacity: .5;
        position: fixed;
        top: 0;
        z-index: 1040;
        width: 100vw;
        height: 100vh;
    }
}

.modal {
    margin: 1.75rem auto;
    max-width: 800px;
    z-index: 1050;

    .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        outline: 0;
        border: none;
        box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
        overflow: visible;
        background-color: rgba(255, 0, 0, 0.6);
        background-clip: padding-box;
        // border: 1px solid rgba(34, 41, 47, .2);
        border-radius: var(--border-radius);

        header {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            background-color: rgba(255, 0, 0, 0.3);
            border-radius: var(--border-radius);

            h4 {
                font-size: 16px;
                font-weight: 500;
            }

            .close-icon {
                cursor: pointer;

                &:hover {
                    transform: scale(1.05);
                }
            }
        }

        .content {
            padding: 1rem;
        }
    }
}

@media (max-width: 568px) {
    .modal {
        padding: 0 2rem;
    }
}

.modal-user-action-buttons {
    display: flex;
    justify-content: end;
    gap: .8rem;
}

@media (max-width: 568px) {
    .modal-user-action-buttons {
        flex-direction: column;
    }
}

@keyframes showOpacity {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes hideOpacity {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes showTranslate {
    0% {
        transform: translateY(-200px);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes hideTranslate {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-200px);
    }
}
</style>
