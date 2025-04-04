<script setup lang="ts">
import AppLayout from "@/layouts/app/AppHeaderLayout.vue"
import { type NavItem } from '@/types';
import { Squares2X2Icon } from "@heroicons/vue/24/outline";

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Squares2X2Icon
    }
];


</script>

<template>
    <AppLayout :navItems="navItems">
        <slot />
    </AppLayout>
</template>
