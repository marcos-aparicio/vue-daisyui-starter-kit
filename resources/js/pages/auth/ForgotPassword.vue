<script setup lang="ts">

import { Link, useForm } from '@inertiajs/vue3';
import AuthBase from '@/layouts/AuthLayout.vue';
import InputError from '@/components/InputError.vue';

defineProps<{
    status?: string
}>();

const form = useForm({
    email: "",
})

const submit = () => {
    form.post(route('password.email'))
};

</script>

<template>
    <AuthBase title="Forgot your password" description="Enter your email to receive a password reset link">

        <Head title="Forgot your password" />

        <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-2">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Email address</legend>
                <input type="text" class="w-full input rounded-lg" placeholder="email@example.com"
                    v-model="form.email" />
                <InputError :message="form.errors.email" />
            </fieldset>
            <button type="submit" class="btn btn-primary w-full rounded-lg" :disabled="form.processing">
                <span v-if="form.processing" class="loading loading-spinner loading-xs"></span>
                Email password reset link
            </button>
            <p class="text-sm text-center my-2">
                <span class="opacity-75">Or, return to </span>
                <Link class="link" :href="route('login')" :tabindex="5">log in</Link>
            </p>
        </form>
    </AuthBase>
</template>
