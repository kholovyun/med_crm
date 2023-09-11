import { ERoles } from "../../../enums/ERoles";

export const SideBarLinksArray = [
    {
        iconClass: "doctors_icon",
        path: "/admin-page/doctors",
        label: "Врачи",
        access: [ERoles.ADMIN, ERoles.SUPERADMIN]
    },
    {
        iconClass: "children_icon",
        path: "/admin-page/children",
        label: "Пациенты",
        access: [ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.DOCTOR]
    },
    {
        iconClass: "parents_icon",
        path: "/admin-page/parents",
        label: "Родители пациентов",
        access: [ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.DOCTOR]
    },
    {
        iconClass: "reviews_icon",
        path: "/admin-page/reviews",
        label: "Отзывы",
        access: [ERoles.ADMIN, ERoles.SUPERADMIN]
    },
    {
        iconClass: "admin_profile_icon",
        path: "/admin-page/profile",
        label: "Мой профиль",
        access: [ERoles.ADMIN, ERoles.SUPERADMIN]     
    },
    {
        iconClass: "admins_icon",
        path: "/admin-page/admins",
        label: "Администраторы",
        access: [ERoles.SUPERADMIN]     
    },
    {
        iconClass: "statistics_icon",
        path: "/admin-page/",
        label: "Статистика",
        access: [ERoles.SUPERADMIN]     
    }
];