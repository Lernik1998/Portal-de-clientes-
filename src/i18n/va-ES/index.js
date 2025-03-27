export default {











  // LoginPage.vue
  header: {
    titulo: "No estàs amb nosaltres?",
    descripcion: "La millor solució disponible per a gestionar els clients de la teua empresa.",
    boton_contacto: "Contacta'ns"
  },

  login: {
    titulo: "Iniciar sessió",
    correo: {
      label: "Correu electrònic",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    contraseña: {
      label: "Contrasenya",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    boton: "Iniciar sessió"
  },

  dialogo_confirmacion: {
    mensaje: "Correu enviat correctament. Revise la safata de correu no desitjat si no el troba.",
    codigo_verificacion: {
      label: "Codi de verificació",
      error_obligatorio: "Este camp és obligatori",
      error_negativo: "No es permeten números negatius",
      error_largo: "El número no és vàlid"
    },
    boton_validar: "Validar",
    boton_cancelar: "Cancel·lar",
    boton_reenviar: "Reenviar",
    reenviar: "No has rebut el correu? Reenviar"
  },
  notificaciones: {
    error_login: "Error en l'inici de sessió",
    error_general: "Error: ",
    correo_reenviado: "S'ha reenviat el correu a "
  },

  // DashboardPage.vue
  dashboard: {
    bienvenida: "Benvingut",
    servicios: "Serveis contractats",
    avisos: "Avisos",
    historico_avisos: "Històric d'avis",
    total_facturado: "Facturació",
    facturación: "Facturació"
  },

  // MainLayout.vue
  dropdownItems: {
    cambiar_contraseña: "Canviar contrasenya",
    cerrar_sesion: "Tancar sessió",
    idioma: "Idioma",
    secciones: "Seccions"
  },
// Pendiente de revisar la reactividad en el qdrawer
  tabs: {
    dashboard: "Panell de control",
    servicios: "Serveis",
    avisos: "Avisos",
    facturas: "Factures"
  },

  dialogo_cambio_contraseña: {
    titulo: "Canviar contrasenya",
    contraseña_actual: {
      label: "Contrasenya actual",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    nueva_contraseña: {
      label: "Contrasenya nova",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    confirmar_contraseña: {
      label: "Confirmar contrasenya",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    boton_enviar: "Enviar",
    boton_cancelar: "Cancel·lar"
  },

  // EquiposPage.vue

  pagina_servicios: {
    cabecera: {
      titulo: "Llista de serveis",
      descripcion: "Consulte els seus serveis contractats"
    },
    tabla_tarjetas: {
      sin_resultados: "No hi ha resultats"
    }
  },

  // EquipoSeleccionado.vue

  pes: {
    boton_volver: "Tornar",
    descripcion: "Descripció de l'equip",
    texto_titulo: "Seleccione una opció",
    leer_mas: "Llegir més",
    leer_menos: "Llegir menys",
    selecciona_opcion: "Seleccione una opció"
  },

  // FormSoporte.vue

  formSoporte: {
    nombre: {
      label: "Nom del contacte",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    telefono: {
      label: "Telèfon del contacte",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    horario: {
      label: "Horari",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    problema: {
      label: "Descripció del problema",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    articulos: {
      label: "Articles",
      error_obligatorio: "Este camp és obligatori",
      error_largo: "El text és massa llarg"
    },
    boton_cancelar: "Cancel·lar",
    boton_volver: "Tornar",
    boton_enviar: "Enviar"
  },

  // FormContadores.vue
  formContadores: {
    ultimo_lectura: "Última lectura",
    error_obligatorio: "Este camp és obligatori",
    error_negativo: "No es permeten números negatius",
    error_grande: "El número és massa gran",
    boton_enviar: "Enviar",
    boton_cancelar: "Cancel·lar",
    notificacion_exito: "Comptadors modificats correctament",
    notificacion_error: "Error en modificar els comptadors"
  },

  // AvisosPage.vue

  avisosPage: {
    cabecera: {
      titulo: "Els teus avisos",
      descripcion: "Visualitze els seus parts de treball generats"
    },
    dialogo: {
      titulo: "Resolució d'avís",
      cerrar: "Tancar",
      informes_tecnicos: "Informes tècnics"
    },
    timeline: {
      fecha: "Data",
      titulo: "Títol",
      descripcion: "Descripció",
      informe: "Informe"
    }
  },

  // TablaAvisos.vue
  tablaAvisos: {
    no_datos: "No hi ha dades per a mostrar",
    select_equipo: "Seleccione equip",
    estados: {
      todos: "Tots",
      nuevos: "Nous",
      proceso: "En procés",
      cerrados: "Tancats"
    },
    columnas: {
      estado: "Estat",
      codigo: "Codi",
      servicio: "Servei",
      creado: "Creat",
      actualizado: "Actualitzat",
      tecnico: "Tècnic assignat",
      detalles: "Detalls"
    },
    estados_avisos: {
      nueva: "Nova",
      asignado: "Tècnic assignat",
      pendiente: "Pendent d'assignació",
      visitado: "Visitada / sense acabar",
      supervisar: "Supervisar",
      proceso: "En procés",
      cerrado: "Tancat"
    },
    botones: {
      detalles: "Detalls"
    }
  },

  // TarjetaAviso.vue
  tarjetaAviso: {
    estatus: {
      nuevo: "Nova",
      asignado: "Assignat:",
      asignadoTecnico: "Tècnic assignat",
      pendiente: "Pendent d'assignació",
      visitado: "Visitada / sense acabar",
      proceso: "En procés",
      supervisar: "Supervisar",
      cerrado: "Tancat"
    }
  },

  // FacturasPage.vue
  facturasPage: {
    cabecera: {
      titulo: "Factures",
      descripcion: "Consulte totes les seues factures"
    },
    botones: {
      cerrar: "Tancar"
    }
  },

  // TablaFacturas.vue
  tablaFacturas: {
    no_datos: "No hi ha dades per a mostrar",
    columnas: {
      cod: "Codi",
      fch: "Data",
      hor: "Hora",
      base: "Base",
      iva: "IVA",
      tot: "Total",
      detalles: "Detalls"
    }
  },

  // AvisoSeleccionado.vue
detalleAviso: {
  boton_volver: "Enrere",
  titulo_codigo: "Codi",
  titulo_detalles: "Detalls de l'Avís",
  titulo_piezas: "Peçes sol·licitades",
  no_datos: "No hi ha dades per mostrar.",
  columnas: {
    articulo: "Article",
    cantidad: "Quantitat",
    estado: "Estat"
  },
  etapas: {
    creado: {
      titulo: "Avís Creat",
      descripcion: "L'avís ha sigut registrat correctament."
    },
    asignado: {
      titulo: "Assignat a Tècnic",
      descripcion: {
        asignado: "S'ha assignat a un tècnic.",
        pendiente: "Pendents d'assignar a un tècnic."
      }
    },
    proceso: {
      titulo: "En Procés",
      descripcion: {
        iniciado: "El tècnic està treballant en l'avís.",
        pendiente: "Pendents de començar el treball."
      }
    },
    finalizado: {
      titulo: "Finalitzat",
      descripcion: {
        resuelto: "L'avís ha sigut resolt i tancat.",
        pendiente: "Pendents de resolució."
      }
    }
  },
  informes: {
    titulo: "Informes tècnics",
    tecnico: "Tècnic",
    fecha: "Data",
    descripcion: "Informe"
  },
  paginacion: {
    anterior: "Anterior",
    siguiente: "Següent",
    pagina: "Pàgina {page} de {total}"
  }
},

// FacturaSeleccionada.vue - Valenciano

  facturas: {
    volver: "Tornar",
    tabla: {
      no_datos: "No hi ha dades per mostrar",
      columnas: {
        numAlb: "Nº Albarà",
        fch: "Data",
        hor: "Hora",
        ref: "Ref.",
        articulo: "Article",
        cantidad: "Quantitat",
        precio: "Preu",
        dto: "%Dte",
        iva: "%IVA",
        imp: "Import"
      }
    }
  }
}