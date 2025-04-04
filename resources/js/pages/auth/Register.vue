<script setup lang="ts">
import AuthBase from '@/layouts/AuthLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import InputError from "@/components/InputError.vue";

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation')
    });
}

</script>

<template>
    <AuthBase title="Create an account" description="Enter the details to create your account">

        <Head title="Register" />
        <form @submit.prevent="submit" class="flex flex-col gap-2">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Name</legend>
                <input type="text" class="w-full input rounded-lg" placeholder="Full Name" v-model="form.name" />
                <InputError :message="form.errors.name" />
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Email address</legend>
                <input type="text" class="w-full input rounded-lg" placeholder="email@example.com"
                    v-model="form.email" />
                <InputError :message="form.errors.email" />
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">
                    Password
                </legend>
                <input id="password" type="password" class="w-full input rounded-lg" placeholder="Password"
                    autocomplete="current-password" v-model="form.password" />
                <InputError :message="form.errors.password" />
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">
                    Confirm Password
                </legend>
                <input id="confirm-password" type="password" class="w-full input rounded-lg"
                    placeholder="Confirm password" autocomplete="current-password"
                    v-model="form.password_confirmation" />
                <InputError :message="form.errors.password_confirmation" />
            </fieldset>

            <button type="submit" class="btn btn-primary w-full rounded-lg" :disabled="form.processing">
                <span v-if="form.processing" class="loading loading-spinner loading-xs"></span>
                Create an account
            </button>
            <p class="text-sm text-center my-2">
                <span class="opacity-75">Already have an account? </span>
                <Link class="link" :href="route('login')" :tabindex="5">Log in</Link>
            </p>
        </form>

    </AuthBase>
</template>
