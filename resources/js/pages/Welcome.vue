<script setup lang="ts">
import ApplicationArt from "@/components/AppArt.vue";
import { ArrowUpRightIcon } from "@heroicons/vue/24/solid";
import { Head, Link } from "@inertiajs/vue3";
</script>

<template>

    <Head title="Welcome" />
    <div class="flex min-h-screen flex-col items-center p-6 lg:p-8 gap-8">
        <header class="flex gap-4 justify-end w-full items-start max-w-[335px] text-sm lg:max-w-4xl">

            <Link :href="route('dashboard')" class="btn rounded-lg btn-outline" v-if="$page.props.auth.user">
            Dashboard
            </Link>
            <template v-else>
                <Link :href="route('login')" class="btn rounded-lg btn-ghost">
                Log in
                </Link>
                <Link :href="route('register')" class="btn rounded-lg">
                Register
                </Link>
            </template>
        </header>
        <main
            class="flex flex-col-reverse max-w-[335px] overflow-hidden rounded-lg lg:max-w-4xl lg:flex-row bg-base-200 border-1 border-primary lg:my-auto">
            <div class="flex-1 flex items-center justify-center p-8 lg:px-24 lg:py-20">
                <div class="flex flex-col gap-1 text-sm">
                    <h1 class="font-bold mb-1">Let's get started</h1>
                    <p class="flex flex-col font-medium opacity-75">
                        <span>Laravel has an incredibly rich ecosystem.</span>
                        <span>We suggest starting with the following.</span>
                    </p>
                    <ul class="flex flex-col gap-2 my-4 text-sm">
                        <li>
                            <span>
                                Read the
                                <a class="link link-error underline underline-offset-2" href="https://laravel.com/docs"
                                    target="_blank">Documentation
                                    <ArrowUpRightIcon class="icon size-2 md:size-4 inline-block" />
                                </a>
                            </span>
                        </li>
                        <li>
                            <span>
                                Watch video tutorials at
                                <a class="link link-error underline underline-offset-2" href="https://laracasts.com"
                                    target="_blank">Laracasts
                                    <ArrowUpRightIcon class="icon size-2 md:size-4 inline-block" />
                                </a>
                            </span>
                        </li>
                    </ul>
                    <a href="https://cloud.laravel.com" target="_blank"
                        class="btn btn-wide btn-primary w-fit rounded-lg">Deploy
                        now</a>
                </div>
            </div>
            <div class="flex-1">
                <ApplicationArt />
            </div>
        </main>
    </div>
</template>
