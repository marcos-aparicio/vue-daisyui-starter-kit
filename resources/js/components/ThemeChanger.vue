<script setup lang="ts">
import { SwatchIcon } from '@heroicons/vue/16/solid';
import { themes } from "@/composables/useAppearance";
import { useAppearance } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();

const change = (e: any) => {
    updateAppearance(e.currentTarget.value);
}
</script>
<template>
    <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost m-1">
            <SwatchIcon class="size-4" />
        </div>
        <ul tabindex="0" class="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl">
            <li>
                <span class="text-sm opacity-75 p-2">Theme:</span>
            </li>
            <li v-for="theme in themes" :key="theme">
                <input type="radio" name="theme-dropdown" class="btn btn-sm btn-block  justify-start"
                    :class="appearance === theme ? 'btn-primary' : 'btn-ghost'" :aria-label="theme" :value="theme"
                    @change="change" />
            </li>
        </ul>
    </div>
</template>
