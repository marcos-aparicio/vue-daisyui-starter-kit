<script setup lang="ts">
import AuthBase from '@/layouts/AuthLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import InputError from "@/components/InputError.vue";

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <AuthBase title="Log in to your account" description="Enter your email and password below to log in">

        <Head title="Log in" />

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
            <fieldset class="fieldset">
                <legend class="fieldset-legend w-full flex justify-between">
                    <span>Password</span>
                    <Link :href="route('password.request')" v-if="canResetPassword" class="font-light link">Forgot
                    password?</Link>
                </legend>
                <input id="password" type="password" class="w-full input rounded-lg" placeholder="Password"
                    autocomplete="current-password" v-model="form.password" />
                <InputError :message="form.errors.password" />
            </fieldset>
            <label class="my-2">
                <input type="checkbox" class="checkbox checkbox-sm rounded-md" v-model="form.remember" />
                Remember me
            </label>
            <button type="submit" class="btn btn-primary w-full rounded-lg" :disabled="form.processing">
                <span v-if="form.processing" class="loading loading-spinner loading-xs"></span>
                Log in
            </button>
            <p class="text-sm text-center my-2">
                <span class="opacity-75">Don't have an account? </span>
                <Link class="link" :href="route('register')" :tabindex="5">Sign up</Link>
            </p>
        </form>
    </AuthBase>
</template>
