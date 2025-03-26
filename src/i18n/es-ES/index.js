// This is just an example,
// so you can safely delete all default props below

export default {
  // failed: 'Acción fallida',
  // success: 'Acción exitosa',
  // welcome: 'Bienvenido',
  // login: 'Iniciar sesión',
  // logout: 'Cerrar sesión',
  // dashboard: 'Dashboard',


  // LoginPage.vue
  header: {
    titulo: "No estás con nosotros?",
    descripcion: "La mejor solución disponible para gestionar los clientes de tu empresa.",
    boton_contacto: "Contáctanos"
  },

  login: {
    titulo: "Iniciar sesión",
    correo: {
      label: "Correo Electrónico",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    contraseña: {
      label: "Contraseña",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    boton: "Iniciar Sesión"
  },

  dialogo_confirmacion: {
    mensaje: "Correo enviado correctamente. Revise su bandeja de correo no deseado si no lo encuentra.",
    codigo_verificacion: {
      label: "Código de verificación",
      error_obligatorio: "Este campo es obligatorio",
      error_negativo: "No se permiten números negativos",
      error_largo: "El número no es válido"
    },
    boton_validar: "Validar",
    boton_cancelar: "Cancelar",
    boton_reenviar: "Reenviar",
    reenviar: "¿No has recibido el correo? Reenviar"
  },
  notificaciones: {
    error_login: "Error en el inicio de sesión",
    error_general: "Error: ",
    correo_reenviado: "Se ha reenviado el correo a "
  },

  // DashboardPage.vue
  dashboard: {
    bienvenida: "Bienvenido",
    servicios: "Servicios contratados",
    avisos: "Avisos",
    historico_avisos: "Histórico avisos",
    total_facturado: "Facturación",
    facturación: "Facturación"
  },

  // MainLayout.vue
  dropdownItems: {
    cambiar_contraseña: "Cambiar contraseña",
    cerrar_sesion: "Cerrar sesión",
    idioma: "Idioma",
    secciones: "Secciones"
  },
// Pendiente de revisar la reactividad en el qdrawer
  tabs: {
    dashboard: "Panel de control",
    servicios: "Servicios",
    avisos: "Avisos",
    facturas: "Facturas"
  },

  dialogo_cambio_contraseña: {
    titulo: "Cambiar contraseña",
    contraseña_actual: {
      label: "Contraseña actual",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    nueva_contraseña: {
      label: "Contraseña nueva",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    confirmar_contraseña: {
      label: "Confirmar contraseña",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    boton_enviar: "Enviar",
    boton_cancelar: "Cancelar"
  },

  // EquiposPage.vue

  pagina_servicios: {
    cabecera: {
      titulo: "Lista de Servicios",
      descripcion: "Consulte sus servicios contratados"
    },
    tabla_tarjetas: {
      sin_resultados: "No hay resultados"
    }
  },

  // EquipoSeleccionado.vue

  pes: {
      boton_volver: "Volver",
      descripcion: "Descripción del equipo",
      texto_titulo: "Seleccione una opción",
      leer_mas: "Leer más",
      leer_menos: "Leer menos",
      selecciona_opcion: "Seleccione una opción"
  },

  // FormSoporte.vue

  formSoporte: {
    nombre: {
      label: "Nombre del Contacto",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    telefono: {
      label: "Teléfono del Contacto",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    horario: {
      label: "Horario",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    problema: {
      label: "Descripción del Problema",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    articulos: {
      label: "Artículos",
      error_obligatorio: "Este campo es obligatorio",
      error_largo: "El texto es demasiado largo"
    },
    boton_cancelar: "Cancelar",
    boton_volver: "Volver",
    boton_enviar: "Enviar"
  },

  // FormContadores.vue
  formContadores: {
    ultimo_lectura: "Última lectura",
    error_obligatorio: "Este campo es obligatorio",
    error_negativo: "No se permiten números negativos",
    error_grande: "El número es demasiado grande",
    boton_enviar: "Enviar",
    boton_cancelar: "Cancelar",
    notificacion_exito: "Contadores modificados correctamente",
    notificacion_error: "Error al modificar contadores"
  },

  // AvisosPapge.vue

  avisosPage: {
    cabecera: {
      titulo: "Sus avisos",
      descripcion: "Visualice sus partes de trabajo generados"
    },
    dialogo: {
      titulo: "Resolución aviso",
      cerrar: "Cerrar",
      informes_tecnicos: "informes técnico"
    },
    timeline: {
      fecha: "Fecha",
      titulo: "Título",
      descripcion: "Descripción",
      informe: "Informe"
    }
  },

  // TablaAvisos.vue
  tablaAvisos: {
    no_datos: "No hay datos para mostrar",
    select_equipo: "Seleccione equipo",
    estados: {
      todos: "Todos",
      nuevos: "Nuevos",
      proceso: "En proceso",
      cerrados: "Cerrados"
    },
    columnas: {
      estado: "Estado",
      codigo: "Código",
      servicio: "Servicio",
      creado: "Creado",
      actualizado: "actualizado",
      tecnico: "Técnico asignado",
      detalles: "Detalles"
    },
    estados_avisos: {
      nueva: "Nueva",
      asignado: "Técnico asignado",
      pendiente: "Pendiente asignación",
      proceso: "En proceso",
      cerrado: "Cerrado"
    },
    botones: {
      detalles: "Detalles"
    }
  }
}
