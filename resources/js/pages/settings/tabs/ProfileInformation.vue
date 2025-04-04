<script setup lang="ts">
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';

import InputError from '@/components/InputError.vue';
import { type SharedData, type User } from '@/types';

const page = usePage<SharedData>();
const user = page.props.auth.user as User;

defineProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>();

const form = useForm({
    name: user.name,
    email: user.email,
});

const submit = () => {
    form.patch(route('profile.update'), {
        preserveScroll: true,
    });
};
</script>

<template>

    <Head title="Profile settings" />
    <div class="flex flex-col space-y-6">
        <!--small heading -->
        <header>
            <h3 class="mb-0.5  font-medium">Profile information</h3>
            <p class="text-sm opacity-75">
                Update your name and email address
            </p>
        </header>
        <!--end small heading -->

        <form @submit.prevent="submit" class="space-y-6">
            <div class="grid gap-2">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Name</legend>
                    <input type="text" class="w-full input rounded-lg" placeholder="Full Name" v-model="form.name" />
                    <InputError :message="form.errors.name" />
                </fieldset>
            </div>

            <div class="grid gap-2">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Email address</legend>
                    <input type="text" class="w-full input rounded-lg" placeholder="email@example.com"
                        v-model="form.email" />
                    <InputError :message="form.errors.email" />
                </fieldset>
            </div>

            <div v-if="mustVerifyEmail && !user.email_verified_at">
                <p class="-mt-4 text-sm">
                    Your email address is unverified.
                    <Link :href="route('verification.send')" method="post" as="button"
                        class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:!decoration-current dark:decoration-neutral-500">
                    Click here to resend the verification email.
                    </Link>
                </p>

                <div v-if="status === 'verification-link-sent'" class="mt-2 text-sm font-medium text-green-600">
                    A new verification link has been sent to your email address.
                </div>
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
