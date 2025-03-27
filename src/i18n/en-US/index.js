// This is just an example,
// so you can safely delete all default props below

export default {
  // failed: 'Action failed',
  // success: 'Action was successful',
  // welcome: 'Welcome',
  // login: 'Login',
  // logout: 'Logout',
  // dashboard: 'Dashboard',


   // LoginPage.vue
  header: {
    titulo: "Not with us yet?",
    descripcion: "The best available solution to manage your company's clients.",
    boton_contacto: "Contact us"
  },

  login: {
    titulo: "Sign in",
    correo: {
      label: "Email Address",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    contraseña: {
      label: "Password",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    boton: "Sign In"
  },

  dialogo_confirmacion: {
    mensaje: "Email sent successfully. Check your spam folder if you don't find it.",
    codigo_verificacion: {
      label: "Verification code",
      error_obligatorio: "This field is required",
      error_negativo: "Negative numbers are not allowed",
      error_largo: "The number is not valid"
    },
    boton_validar: "Validate",
    boton_cancelar: "Cancel",
    boton_reenviar: "Resend",
    reenviar: "Didn't receive the email? Resend"
  },
  notificaciones: {
    error_login: "Login error",
    error_general: "Error: ",
    correo_reenviado: "Email resent to "
  },

  // DashboardPage.vue
  dashboard: {
    bienvenida: "Welcome",
    servicios: "Contracted Services",
    avisos: "Notices",
    historico_avisos: "Historical Notices",
    total_facturado: "Total Billed",
    facturación: "Facturation"
  },

  // MainLayout.vue
  dropdownItems: {
    cambiar_contraseña: "Change Password",
    cerrar_sesion: "Close Session",
    idioma: "Language",
    secciones: "Sections"
  },

  tabs: {
    dashboard: "Dashboard",
    servicios: "Services",
    avisos: "Notices",
    facturas: "Invoices"
  },

  dialogo_cambio_contraseña: {
    titulo: "Change Password",
    contraseña_actual: {
      label: "Current Password",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    nueva_contraseña: {
      label: "New Password",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    confirmar_contraseña: {
      label: "Confirm Password",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    boton_enviar: "Submit",
    boton_cancelar: "Cancel"
  },

  // EquiposPage.vue

  pagina_servicios: {
    cabecera: {
      titulo: "Service List",
      descripcion: "Check your contracted services"
    },
    tabla_tarjetas: {
      sin_resultados: "No results found"
    }
  },

  // EquipoSeleccionado.vue

  pes: {
      boton_volver: "Back",
      descripcion: "Team description",
      texto_titulo: "Select an option",
      leer_mas: "Read more",
      leer_menos: "Read less",
      selecciona_opcion: "Select an option"
  },

  // FormSoporte.vue

  formSoporte: {
    nombre: {
      label: "Contact Name",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    telefono: {
      label: "Contact Phone",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    horario: {
      label: "Schedule",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    problema: {
      label: "Problem Description",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    articulos: {
      label: "Articles",
      error_obligatorio: "This field is required",
      error_largo: "The text is too long"
    },
    boton_cancelar: "Cancel",
    boton_volver: "Back",
    boton_enviar: "Submit"
  },

  // FormContadores.vue
  formContadores: {
    ultimo_lectura: "Last reading",
    error_obligatorio: "This field is required",
    error_negativo: "Negative numbers are not allowed",
    error_grande: "The number is too large",
    boton_enviar: "Submit",
    boton_cancelar: "Cancel",
    notificacion_exito: "Counters modified successfully",
    notificacion_error: "Error modifying counters"
  },

  // AvisosPage.vue

  avisosPage: {
    cabecera: {
      titulo: "Your Tickets",
      descripcion: "View your generated work orders"
    },
    dialogo: {
      titulo: "Ticket Resolution",
      cerrar: "Close",
      informes_tecnicos: "Technical reports"
    },
    timeline: {
      fecha: "Date",
      titulo: "Title",
      descripcion: "Description",
      informe: "Report"
    }
  },

  // TablaAvisos.vue
  tablaAvisos: {
    no_datos: "No data to display",
    select_equipo: "Select team",
    estados: {
      todos: "All",
      nuevos: "New",
      proceso: "In progress",
      cerrados: "Closed"
    },
    columnas: {
      estado: "Status",
      codigo: "Code",
      servicio: "Service",
      creado: "Created",
      actualizado: "Updated",
      tecnico: "Assigned technician",
      detalles: "Details"
    },
    estados_avisos: {
      nueva: "New",
      asignado: "Technician assigned",
      pendiente: "Pending assignment",
      visitado: "Visit / not completed",
      supervisar: "Supervise",
      proceso: "In progress",
      cerrado: "Closed"
    },
    botones: {
      detalles: "Details"
    }
  },

  // TarjetaAviso.vue
  tarjetaAviso: {
    estatus: {
      nuevo: "New",
      asignado: "Assigned:",
      asignadoTecnico: "Technician assigned",
      pendiente: "Pending assignment",
      visitado: "Visit / not completed",
      proceso: "In progress",
      supervisar: "Supervise",
      cerrado: "Closed"
    }
  },

  // FacturasPage.vue
  facturasPage: {
    cabecera: {
      titulo: "Invoices",
      descripcion: "Check all your invoices",
    },
    botones: {
    cerrar: "Close",
  }
  },

  // TablaFacturas.vue
  tablaFacturas: {
    no_datos: "No data to display",
    columnas: {
      cod: "Code",
      fch: "Date",
      hor: "Time",
      base: "Base",
      iva: "VAT",
      tot: "Total",
      detalles: "Details"
    }
  },

  // AvisoSeleccionado.vue
detalleAviso: {
  boton_volver: "Back",
  titulo_codigo: "Code",
  titulo_detalles: "Notice Details",
  titulo_piezas: "Requested Parts",
  no_datos: "No data to display.",
  columnas: {
    articulo: "Item",
    cantidad: "Quantity",
    estado: "Status"
  },
  etapas: {
    creado: {
      titulo: "Notice Created",
      descripcion: "The notice was registered successfully."
    },
    asignado: {
      titulo: "Assigned to Technician",
      descripcion: {
        asignado: "A technician has been assigned.",
        pendiente: "Pending assignment to a technician."
      }
    },
    proceso: {
      titulo: "In Progress",
      descripcion: {
        iniciado: "The technician is working on the notice.",
        pendiente: "Pending work to begin."
      }
    },
    finalizado: {
      titulo: "Completed",
      descripcion: {
        resuelto: "The notice has been resolved and closed.",
        pendiente: "Pending resolution."
      }
    }
  },
  informes: {
    titulo: "Technical Reports",
    tecnico: "Technician",
    fecha: "Date",
    descripcion: "Report"
  },
  paginacion: {
    anterior: "Previous",
    siguiente: "Next",
    pagina: "Page {page} of {total}"
  }
},

// FacturaSeleccionada.vue - English

  facturas: {
    volver: "Back",
    tabla: {
      no_datos: "No data to display",
      columnas: {
        numAlb: "Delivery Note No.",
        fch: "Date",
        hor: "Time",
        ref: "Ref.",
        articulo: "Item",
        cantidad: "Quantity",
        precio: "Price",
        dto: "% Discount",
        iva: "% VAT",
        imp: "Amount"
      }
    }
  }
}