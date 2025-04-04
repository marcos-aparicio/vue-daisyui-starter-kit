<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';

</script>

<template>

    <Head title="Dashboard" />

    <AppLayout>
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="relative !z-10 aspect-video overflow-hidden rounded-xl border border-primary">
                    <PlaceholderPattern />
                </div>
                <div class="relative !z-10 aspect-video overflow-hidden rounded-xl border border-primary">
                    <PlaceholderPattern />
                </div>
                <div class="relative !z-10 aspect-video overflow-hidden rounded-xl border border-primary">
                    <PlaceholderPattern />
                </div>
            </div>
            <div class="relative !z-10 min-h-[100vh] flex-1 rounded-xl border border-primary  md:min-h-min">
                <PlaceholderPattern />
            </div>
        </div>
    </AppLayout>
</template>
