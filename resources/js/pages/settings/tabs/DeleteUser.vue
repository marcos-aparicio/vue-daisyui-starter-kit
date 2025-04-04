<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

// Components
import InputError from '@/components/InputError.vue';
import { XMarkIcon } from '@heroicons/vue/16/solid';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

const passwordInput = ref<HTMLInputElement | null>(null);

const form = useForm({
    password: '',
});

const deleteUser = (e: Event) => {
    e.preventDefault();

    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    form.clearErrors();
    form.reset();
};
</script>

<template>
    <div class="space-y-6">
        <!--small heading -->
        <header>
            <h3 class="mb-0.5  font-medium">Delete account</h3>
            <p class="text-sm opacity-75">
                Delete your account and all of its resources
            </p>
        </header>
        <!--end small heading -->
        <div class="rounded-lg alert alert-error alert-outline flex flex-col items-start">
            <div class="relative space-y-0.5">
                <p class="font-medium">Warning</p>
                <p class="text-sm">Please proceed with caution, this cannot be undone.</p>
            </div>
            <!-- Open the modal using ID.showModal() method -->
            <button class="btn btn-error rounded block" onclick="deleteUserModal.showModal()">Delete account</button>
        </div>
        <dialog id="deleteUserModal" class="modal">
            <div class="modal-box border border-primary rounded-lg">
                <div class="flex justify-between">
                    <h3 class="text-lg font-bold">Are you sure you want to delete your account?</h3>
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-ghost btn-circle rounded">
                            <XMarkIcon class="size-4" />
                        </button>
                    </form>
                </div>
                <p class="py-4 text-sm opacity-75">Once your account is deleted, all of its resources and data
                    will also be permanently
                    deleted. Please enter your password to confirm you would like to permanently delete your account.
                </p>
                <form @submit="deleteUser" class="py-4">
                    <label for="password" class="sr-only">Password</Label>
                    <input type="password" class="w-full input rounded-lg" placeholder="Password"
                        v-model="form.password" />
                    <InputError :message="form.errors.password" />
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary rounded">Cancel</button>
                        </form>
                        <button type="submit" class="btn btn-error rounded" v-disabled="form.processing">Delete
                            account</button>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
</template>
