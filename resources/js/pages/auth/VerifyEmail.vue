<script setup lang="ts">

import { Link, useForm } from '@inertiajs/vue3';
import AuthBase from '@/layouts/AuthLayout.vue';

defineProps<{
    status?: string;
}>();

const form = useForm({})

const submit = () => {
    form.post(route('verification.send'));
};

</script>

<template>
    <AuthBase title="Verify email"
        description="Please verify your email address by clicking on the link we just emailed to you.">

        <Head title="Email verification" />

        <div v-if="status === 'verification-link-sent'" class="mb-4 text-center text-sm font-medium text-green-600">
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <form @submit.prevent="submit" class="flex flex-col items-center gap-2">
            <button type="submit" class="btn btn-primary w-fit rounded-lg" :disabled="form.processing">
                <span v-if="form.processing" class="loading loading-spinner loading-xs"></span>
                Resend verification email
            </button>
            <p class="text-sm text-center my-2">
                <Link class="link" :href="route('logout')" method="post" :tabindex="5">Log out</Link>
            </p>
        </form>
    </AuthBase>
</template>
