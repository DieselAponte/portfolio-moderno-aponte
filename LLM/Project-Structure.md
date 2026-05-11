# Estructura del Proyecto: Portfolio Moderno Aponte

## 📁 Directorio Raíz

```
portfolio-moderno-aponte/
├── .gitignore                          # Archivo de configuración de Git
├── eslint.config.mjs                   # Configuración de ESLint
├── LICENSE                             # Licencia del proyecto
├── README.md                           # Documentación principal
├── next-env.d.ts                       # Tipos de entorno Next.js
├── next.config.ts                      # Configuración de Next.js
├── package.json                        # Dependencias y scripts del proyecto
├── pnpm-lock.yaml                      # Lock file de pnpm
├── pnpm-workspace.yaml                 # Configuración de workspace pnpm
├── postcss.config.mjs                  # Configuración de PostCSS
├── tsconfig.json                       # Configuración de TypeScript
│
├── LLM/                                # Documentación y contexto
│   ├── LLM-Context.md                 # Contexto del proyecto para LLM
│   └── Project-Structure.md           # Este archivo
│
├── public/                             # Archivos estáticos accesibles públicamente
│   ├── file.svg                       # Icono de archivo
│   ├── globe.svg                      # Icono de globo
│   ├── next.svg                       # Icono de Next.js
│   ├── vercel.svg                     # Icono de Vercel
│   ├── window.svg                     # Icono de ventana
│   └── models/                        # Modelos 3D
│       └── wheatley-rigged.glb        # Modelo 3D (Wheatley)
│
└── node_modules/                       # Dependencias instaladas (ignorar)
```

---

## 🗂️ Directorio `/src`

### Estructura General

```
src/
├── app/                                # Directorio de aplicación Next.js (App Router)
│   ├── favicon.ico                    # Icono del sitio
│   ├── globals.css                    # Estilos globales
│   ├── layout.tsx                     # Componente de diseño raíz
│   └── page.tsx                       # Página de inicio
│
├── assets/                             # Carpeta para recursos estáticos (vacía - en expansión)
│
├── components/                         # Componentes reutilizables globales (vacía - en expansión)
│
├── features/                           # Módulos de características organizados por feature
│   ├── blog/                          # Módulo: Blog
│   │   ├── components/                # Componentes específicos de blog (vacío)
│   │   ├── hooks/                     # Hooks personalizados de blog (vacío)
│   │   ├── services/                  # Servicios y lógica de negocio (vacío)
│   │   └── types/                     # Tipos TypeScript de blog (vacío)
│   │
│   ├── experience/                    # Módulo: Experiencia
│   │   ├── components/                # Componentes específicos de experiencia (vacío)
│   │   ├── hooks/                     # Hooks personalizados de experiencia (vacío)
│   │   ├── services/                  # Servicios y lógica de negocio (vacío)
│   │   └── types/                     # Tipos TypeScript de experiencia (vacío)
│   │
│   ├── guestbook/                     # Módulo: Libro de Visitas
│   │   ├── components/                # Componentes específicos de guestbook (vacío)
│   │   ├── hooks/                     # Hooks personalizados de guestbook (vacío)
│   │   ├── services/                  # Servicios y lógica de negocio (vacío)
│   │   └── types/                     # Tipos TypeScript de guestbook (vacío)
│   │
│   ├── home/                          # Módulo: Inicio
│   │   ├── components/                # Componentes específicos de inicio (vacío)
│   │   ├── hooks/                     # Hooks personalizados de inicio (vacío)
│   │   ├── services/                  # Servicios y lógica de negocio (vacío)
│   │   └── types/                     # Tipos TypeScript de inicio (vacío)
│   │
│   └── projects/                      # Módulo: Proyectos
│       ├── components/                # Componentes específicos de proyectos (vacío)
│       ├── hooks/                     # Hooks personalizados de proyectos (vacío)
│       ├── services/                  # Servicios y lógica de negocio (vacío)
│       └── types/                     # Tipos TypeScript de proyectos (vacío)
│
├── hooks/                              # Hooks personalizados globales (vacía - en expansión)
│
├── lib/                                # Utilidades y funciones auxiliares (vacía - en expansión)
│
├── styles/                             # Estilos adicionales (vacía - en expansión)
│
└── types/                              # Tipos TypeScript globales (vacía - en expansión)
```

### Resumen de Estadísticas

- **Total de directorios en src/**: 34 directorios
- **Archivos en src/**: 4 archivos (todos en `src/app/`)
- **Módulos de features**: 5 (blog, experience, guestbook, home, projects)
- **Estructura por feature**: 4 subcarpetas estándar (components, hooks, services, types)

---

## 🔄 Prompt para Actualización Automática (Fedora/Linux y Windows 11)
```
Quiero que basado en la estructura actual del proyecto, actualices el documento 
Project-Structure.md con la jerarquía mediante un formato de árbol que muestre 
la distribución actual de carpetas y archivos.

Usa comandos para descubrir la estructura en lugar de almacenarla en memoria, 
para que funcione cuando el proyecto contenga más ficheros.

Directrices:
1. DIRECTORIO RAÍZ: Detalla todos los archivos y carpetas en la raíz del proyecto
   (portfolio-moderno-aponte), EXCEPTO src/ que tendrá su propia sección. 
   Para carpetas temporales como node_modules, solo mencionalas sin detalles.

2. DIRECTORIO SRC: Detalla todo el contenido de src/, incluyendo:
   - Carpetas vacías (indicando que están en expansión)
   - Todas las features y sus subcarpetas
   - Archivos dentro de cada carpeta

3. ESTRUCTURA DEL DOCUMENTO:
   - Encabezado: "# Estructura del Proyecto: Portfolio Moderno Aponte"
   - Sección 1: "## 📁 Directorio Raíz" (con árbol y descripciones)
   - Sección 2: "## 🗂️ Directorio `/src`" (con subsecciones por área)
   - Sección 3: "## 🔄 Prompt para Actualización Automática" (este mismo prompt)
   - Sección 4: "## 📊 Resumen de Estadísticas" (contadores de carpetas/archivos)

4. FORMATO:
   - Usar árboles ASCII con símbolos de carpetas (├──, │, └──)
   - Incluir comentarios descriptivos para cada archivo/carpeta
   - Para carpetas vacías, añadir (vacía - en expansión) o similar

Comandos útiles para descubrir la estructura:
- Linux/Fedora: tree -L 3 -I 'node_modules|.next|.git' /ruta/al/proyecto
- Windows 11 (PowerShell): tree /F /A (en el directorio del proyecto)
- Alternativa universal: find . -not -path '*/node_modules/*' -not -path '*/.next/*' 
  -not -path '*/.git/*' -type f | sort (ajustar -L en tree según profundidad deseada)
```

### 🖥️ Instrucciones Específicas por SO

#### Fedora Workstation / Linux
```bash
# Generar estructura completa
tree -L 3 -I 'node_modules|.next|.git' /ruta/al/proyecto

# Contar archivos por directorio
find /ruta/al/proyecto -not -path '*/node_modules/*' -not -path '*/.next/*' \
  -not -path '*/.git/*' -type f | wc -l

# Listar solo directorios
find /ruta/al/proyecto -not -path '*/node_modules/*' -not -path '*/.next/*' \
  -not -path '*/.git/*' -type d | sort
```

#### Windows 11 (PowerShell)
```powershell
# Generar estructura completa (ejecutar en la raíz del proyecto)
tree /F /A

# Alternativa con ForEach para más control
Get-ChildItem -Recurse -Exclude node_modules,.next,.git | 
  Select-Object FullName, @{Name="Type"; Expression={if($_.PSIsContainer){"Dir"}else{"File"}}}

# Contar archivos
(Get-ChildItem -Recurse -Exclude node_modules,.next,.git -File).Count
```

---

## 📌 Notas de Mantenimiento
- Este documento debe actualizarse siempre que se agreguen nuevas carpetas o archivos principales
- Las carpetas marcadas como "(vacía - en expansión)" se completarán según el desarrollo
- La estructura modular de features permite escalabilidad sin afectar otras partes
- El prompt está diseñado para ser ejecutable en línea de comandos en ambas plataformas
