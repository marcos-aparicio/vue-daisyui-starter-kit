<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';


const passwordInput = ref<HTMLInputElement | null>(null);
const currentPasswordInput = ref<HTMLInputElement | null>(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: (errors: any) => {
            if (errors.password) {
                form.reset('password', 'password_confirmation');
                if (passwordInput.value instanceof HTMLInputElement) {
                    passwordInput.value.focus();
                }
            }

            if (errors.current_password) {
                form.reset('current_password');
                if (currentPasswordInput.value instanceof HTMLInputElement) {
                    currentPasswordInput.value.focus();
                }
            }
        },
    });
};
</script>

<template>

    <Head title="Password settings" />

    <div class="space-y-6">

        <!--small heading -->
        <header>
            <h3 class="mb-0.5  font-medium">Update password</h3>
            <p class="text-sm opacity-75">
                Ensure your account is using a long, random password to stay secure
            </p>
        </header>
        <!--end small heading -->

        <form @submit.prevent="updatePassword" class="space-y-6">
            <div class="grid gap-2">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">
                        Current Password
                    </legend>
                    <input id="current_password" type="password" class="w-full input rounded-lg"
                        placeholder="Current password" ref="currentPasswordInput" autocomplete="current-password"
                        v-model="form.current_password" />
                    <InputError :message="form.errors.current_password" />
                </fieldset>
            </div>

            <div class="grid gap-2">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">
                        New Password
                    </legend>
                    <input id="password" type="password" class="w-full input rounded-lg" placeholder="New password"
                        ref="passwordInput" autocomplete="new-password" v-model="form.password" />
                    <InputError :message="form.errors.password" />
                </fieldset>
            </div>

            <div class="grid gap-2">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">
                        Confirm password
                    </legend>
                    <input id="password_confirmation" type="password" class="w-full input rounded-lg"
                        placeholder="Confirm password" autocomplete="new-password"
                        v-model="form.password_confirmation" />
                    <InputError :message="form.errors.password_confirmation" />
                </fieldset>
            </div>

            <div class="flex items-center gap-4">
                <button type="submit" class="btn btn-primary rounded-lg" :disabled="form.processing">
                    <span v-if="form.processing" class="loading loading-spinner loading-xs"></span>
                    Save
                </button>
                <Transition enter-active-class="transition ease-in-out" enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out" leave-to-class="opacity-0">
                    <p v-show="form.recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
                </Transition>
            </div>
        </form>
    </div>
</template>
