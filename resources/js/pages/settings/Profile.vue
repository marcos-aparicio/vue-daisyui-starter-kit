<script setup lang="ts">
import { type TabItem } from '@/types';
import ProfileInformation from '@/pages/settings/tabs/ProfileInformation.vue';
import ChangePassword from '@/pages/settings/tabs/ChangePassword.vue';
import DeleteUser from '@/pages/settings/tabs/DeleteUser.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import { computed } from 'vue';


// needed for ProfileInformation
const props = defineProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>();

const tabItems: TabItem[] = [
    {
        title: 'Profile',
        component: ProfileInformation,
        id: 1,
        props: props
    },
    {
        title: 'Password',
        component: ChangePassword,
        id: 2,
    },
    {
        title: 'Delete User',
        component: DeleteUser,
        id: 3,
    },
];
const selectedTabID = ref<Number>(tabItems[0].id);
const selectedTab = computed<TabItem>(() => {
    return tabItems.find(item => item.id === selectedTabID.value);
});


</script>

<template>
    <AppLayout>

        <Head title="Profile settings" />
        <div class="px-4 py-6">

            <!--Heading -->
            <div class="mb-8 space-y-0.5">
                <h2 class="text-xl font-semibold tracking-tight">Settings</h2>
                <p class="text-sm">
                    Manage your profile and account settings
                </p>
            </div>
            <!--end Heading-->
            <div class="flex flex-col space-y-8 md:space-y-0 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside class="w-full max-w-xl lg:w-48">
                    <div class="tabs flex flex-col justify-start gap-1">
                        <label v-for="item in tabItems" class="rounded w-full cursor-pointer"
                            :class="selectedTabID === item.id ? 'font-bold bg-base-300' : ''"
                            :for="`profile-tab-${item.id}`">
                            <input class="tab" type="radio" name="profile" :key="item.id" v-model="selectedTabID"
                                :id="`profile-tab-${item.id}`" v-bind:value="item.id" :aria-label="item.title">
                        </label>
                    </div>
                </aside>

                <div class="divider divider-primary"></div>

                <div class="flex-1 md:max-w-2xl">
                    <section class="max-w-xl space-y-12">
                        <component :is="selectedTab.component" v-bind="selectedTab.props"></component>
                    </section>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
