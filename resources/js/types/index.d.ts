import type { PageProps } from "@inertiajs/core";
import { FunctionalComponent, Component } from "vue";

export interface NavItem {
    title: string;
    href: string;
    icon?: FunctionalComponent;
    isActive?: boolean;
}

export interface TabItem {
    title: string;
    component: FunctionalComponent | Component;
    id: Number;
    props?: any;
}
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Auth {
    user: User;
}

export interface SharedData extends PageProps {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
}
