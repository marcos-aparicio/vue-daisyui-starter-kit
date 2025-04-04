<script setup lang="ts">
import { computed } from 'vue';
import { getInitials } from '@/composables/useInitials';
import { usePage } from '@inertiajs/vue3';

const props = defineProps<{
    src?: string;
}>();

defineOptions({
    inheritAttrs: false,
});

const page = usePage();
const auth = computed(() => page.props.auth);

</script>

<template>
    <!-- If src exists -->
    <div class="avatar" v-if="props.src">
        <div class="ring-primary ring-offset-base-100 ring ring-offset-2 w-8 rounded-full" v-bind="$attrs">
            <img :src="src" />
        </div>
    </div>

    <!-- If src is absent -->
    <div class="avatar avatar-placeholder" v-else>
        <div class="bg-primary w-8 rounded-full text-primary-content font-bold text-xs" v-bind="$attrs">
            <span>{{ getInitials(auth?.user.name) }}</span>
        </div>
    </div>
</template>
