<template>
    <section>
        <div class="conteiner is-flex is-justify-content-center">
        <b-notification
            class="appMessage"
            auto-close 
            :type="isError? 'is-danger': 'is-success'"
            v-model="isActive"
            aria-close-label="Close notification">
            {{message}}
        </b-notification>
        </div>
        
    </section>
</template>

<script>
    export default {
        name: 'AppMessage',
        

        computed: {
            isActive: {
                get(){  return this.$store.getters.appMessageIsActive },
                set(value) {
                    this.$store.dispatch('TOGGLE_ACTIVE', value)
                }
            },
            message() {
                return this.$store.getters.appMessage
            },
            isError(){
                return this.$store.getters.appMessageIsError
            }
        }

        
    }
</script>
<style scoped lang="scss">
    .appMessage {
        width: 70%;
        z-index: 100;
        position: absolute;
    }
</style>