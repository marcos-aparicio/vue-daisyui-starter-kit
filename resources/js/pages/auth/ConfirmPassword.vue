<script setup lang="ts">

import { useForm } from '@inertiajs/vue3';
import AuthBase from '@/layouts/AuthLayout.vue';
import InputError from '@/components/InputError.vue';

const form = useForm({
    password: "",
})

const submit = () => {
    form.post(route('password.confirm'), { onFinish: () => form.reset() })
};

</script>

<template>
    <AuthBase title="Confirm your password"
        description="This is a secure area of the application. Please confirm your password before continuing.">

        <Head title="Password confirmation" />

        <form @submit.prevent="submit" class="flex flex-col gap-2">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Password</legend>
                <input type="password" class="w-full input rounded-lg" v-model="form.password" />
                <InputError :message="form.errors.password" />
            </fieldset>
            <button type="submit" class="btn btn-primary w-full rounded-lg" :disabled="form.processing">
                <span v-if="form.processing" class="loading loading-spinner loading-xs"></span>
                Confirm Password
            </button>
        </form>
    </AuthBase>
</template>
