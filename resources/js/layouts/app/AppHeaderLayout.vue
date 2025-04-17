<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import ThemeChanger from "@/components/ThemeChanger.vue";
import { Bars3Icon, XMarkIcon, } from '@heroicons/vue/16/solid';
import { Cog8ToothIcon, BookOpenIcon, FolderIcon } from '@heroicons/vue/24/outline';
import { ArrowRightEndOnRectangleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { type NavItem } from '@/types';


const page = usePage();
defineProps<{
    navItems: NavItem[];
}>();
const auth = computed(() => page.props.auth);

const externalLinkNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/marcos-aparicio/vue-daisyui-starter-kit',
        icon: FolderIcon,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/12.x/starter-kits#community-maintained-starter-kits',
        icon: BookOpenIcon,
    },
]

const currentPath = page.props.ziggy?.location ? new URL(page.props.ziggy.location).pathname : '';
</script>
<template>
    <div class="flex min-h-screen w-full flex-col">
        <!-- start Header -->
        <div class="navbar bg-base-100 shadow-sm gap-2 border-b-primary border-b-1 px-4">
            <!--start drawer-->
            <div class="drawer lg:hidden w-fit flex-none">
                <input id="app-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content  flex-none">
                    <!-- Page content here -->
                    <label for="app-drawer"
                        class="btn btn-square btn-sm btn-ghost hover:btn-primary rounded-lg drawer-button">
                        <Bars3Icon class="size-4" />
                    </label>
                </div>
                <div class="drawer-side z-50">
                    <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                    <div
                        class=" flex flex-col gap-4 bg-base-100 min-h-full text-base-content w-80 p-4  border-r-1 border-primary">
                        <!-- Sidebar content here -->
                        <div class="flex justify-between px-2 lg:px-4">
                            <div class="pt-4">
                                <AppLogoIcon class="size-8" />
                            </div>
                            <label for="app-drawer" aria-label="close sidebar"
                                class="btn btn-ghost btn-sm btn-square rounded self-start">
                                <XMarkIcon class="size-4" />
                            </label>
                        </div>

                        <!--top -->
                        <ul class="menu w-full gap-2 flex-1">
                            <li v-for="item in navItems" :key="item.href">
                                <Link :href="item.href" :class="[
                                    'btn rounded-lg flex justify-start items-center',
                                    currentPath === item.href ? 'btn-primary' : 'btn-ghost'
                                ]">
                                <component :is="item.icon" class="size-4"></component>
                                {{ item.title }}
                                </Link>
                            </li>

                        </ul>

                        <!-- bottom -->
                        <div class="flex flex-col">
                            <!-- external links responsive-->
                            <div v-for="item in externalLinkNavItems" :key="item.href" class="lg:hidden gap-4">
                                <a :href="item.href" class="p-2 flex gap-2 justify-start items-center w-full font-bold"
                                    target="_blank">
                                    <component :is="item.icon" class="size-4"></component>
                                    <span>{{ item.title }}</span>
                                </a>
                            </div>
                            <div class="divider divider-primary !my-0.5 !py-0.5"></div>
                            <!-- end external links responsive-->
                            <div>
                                <ThemeChanger class="dropdown-top" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end drawer-->
            <Link class="flex-none btn btn-ghost" href="/">
            <div class="p-1.5 bg-base-content rounded">
                <AppLogoIcon class="text-base-100 rounded size-4" />
            </div>
            <span>
                {{ $page.props.name }}
            </span>
            </Link>
            <!--nav items-->
            <div v-for="item in navItems" :key="item.href" class="hidden lg:flex items-center">
                <Link :href="item.href" :class="[
                    'btn rounded',
                    currentPath === item.href ? 'btn-primary' : 'btn-ghost'
                ]">
                <component :is="item.icon" class="size-4"></component>
                {{ item.title }}
                </Link>
            </div>
            <!--end nav items-->
            <!-- Dropdown -->
            <div class="flex-1 flex justify-end items-center gap-2">
                <div class="btn btn-ghost btn-square">
                    <MagnifyingGlassIcon class="size-4" />
                </div>
                <!-- external links -->
                <div v-for="item in externalLinkNavItems" :key="item.href" class="hidden lg:flex items-center gap-4">
                    <a :href="item.href" class="btn btn-square btn-ghost" target="_blank">
                        <component :is="item.icon" class="size-4"></component>
                    </a>
                </div>
                <div class="hidden lg:flex">
                    <ThemeChanger />
                </div>
                <!-- end external links -->
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button">
                        <UserAvatar class="cursor-pointer border-base-content hover:border-1 hover:scale-110" />
                    </div>
                    <ul tabindex="0"
                        class="dropdown-content bg-base-100 rounded border-1  border-primary z-1 w-52 mt-2 p-2 shadow-sm menu">
                        <li class="mb-4 w-full">
                            <div class="flex gap-2 items-end !p-0 pointer-events-none w-full">
                                <UserAvatar class="!rounded-lg w-8 h-8" />
                                <p class="text-sm flex flex-col truncate">
                                    <span class="font-bold">{{ auth.user?.name
                                    }}</span>
                                    <span class="text-xs">{{ auth.user?.email }}</span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <Link :href="route('profile.edit')">
                            <Cog8ToothIcon class="size-5" />
                            Settings
                            </Link>
                        </li>
                        <li>
                            <Link :href="route('logout')" method="post">
                            <ArrowRightEndOnRectangleIcon class="size-5" />
                            Log out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
        <!-- end Header -->
        <slot />
    </div>
</template>
