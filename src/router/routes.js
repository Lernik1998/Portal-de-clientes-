const routes = [
  {
    path: "/",
    component: () => import("layouts/IndexLayout.vue"),
    redirect: "/login",
    children: [
      { path: "/login", component: () => import("src/pages/LoginPage.vue")},
      { path: "/equipos/:token", component: ()=> import("src/pages/EquipoSeleccionado.vue")},
      { path: "equipos/contadores/:token", component: ()=> import("src/pages/ContadoresPage.vue")},
      {path: "/prueba", component: ()=>import("src/pages/EquiposPage2.vue")}
    ]
  },
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "", component: () => import("src/pages/DashboardPage.vue") },
      { path: "equipos", component: () => import("src/pages/EquiposPage.vue") },
      { path: "equipos/:token", component: ()=> import("src/pages/EquipoSeleccionado.vue")},
      { path: "equipos/avisos/:id", name: 'avisosEquipo', component: () => import("src/pages/AvisosEquipoSeleccionado.vue")}, // Avisos con filtrado de ID
      { path: "avisos", component: () => import("src/pages/AvisosPage.vue")},
      { path: "avisos/:id", component: () => import("src/pages/AvisoSeleccionado.vue")}, // Avisos General
      { path: "facturas", component: () => import("src/pages/FacturasPage.vue")},
      { path: "facturas/:id", component: () => import("src/pages/FacturaSeleccionada.vue")},
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
