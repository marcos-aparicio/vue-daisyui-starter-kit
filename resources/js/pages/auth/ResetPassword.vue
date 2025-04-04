<script setup lang="ts">

import { useForm } from '@inertiajs/vue3';
import AuthBase from '@/layouts/AuthLayout.vue';
import InputError from '@/components/InputError.vue';


const props = defineProps<{
    token: string;
    email: string;
}>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: "",
    password_confirmation: ""
})

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => form.reset('password', 'password_confirmation')
    })
};

</script>

<template>
    <AuthBase title="Reset password" description="Please enter your new password below">

        <Head title="Reset password" />

        <form @submit.prevent="submit" class="flex flex-col gap-2">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Email</legend>
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
                Reset password
            </button>
        </form>
    </AuthBase>
</template>
