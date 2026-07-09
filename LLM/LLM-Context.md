# LLM Context: Portfolio Moderno Aponte

## 🎯 Objetivo del Proyecto
Desarrollar un portfolio de alto rendimiento con estética cinemática/tecnológica inspirada en Aperture Science (Portal 2), utilizando una arquitectura escalable y tipado estricto. Este portfolio debe de ser mantenible y garantizar la autenticación de los roles de usuario y administrador garantizando la seguridad y diferencias de responsabilidades.

## 🛠️ Stack Tecnológico
- **Framework:** Next.js 15+ (App Router)
- **Lenguaje:** TypeScript (Strict Mode)
- **Estilos:** Tailwind CSS 
- **Animaciones:** Framer Motion
- **3D:** React Three Fiber + Drei + Three.js
- **Infraestructura:** Supabase (BaaS), Vercel (Deploy)
- **Entorno:** Fedora Linux

## 🏛️ Axiomas de Desarrollo
1. **Feature-Based Architecture:** El código se organiza por dominio funcional en `src/features/`. Cada feature es autónoma.
2. **Rendimiento Primero:** Priorizar Server Components. Uso de `dynamic` imports para componentes pesados (Canvas 3D).
3. **Tipado Total:** Prohibido el uso de `any`. Interfaces claras para cada componente.
4. **Estética Aperture:** Colores oscuros, acentos naranja/amarillo, fuentes monoespaciadas, efectos de "lente" y transiciones amortiguadas.
5. **Clean Code:** Funciones pequeñas, nombres descriptivos, separación clara entre lógica (hooks) y representación (componentes).

## 🤖 Especificaciones de Wheatley (3D)
- **Modelo:** `public/models/wheatley-rigged.glb`
- **Interacción:** `useFrame` para interpolación (lerp) del seguimiento ocular y rotación de chasis.
- **Optimización:** Drace compression, lazy loading, limitado a 60 FPS.

## 📂 Estructura de Referencia
(Ver archivo Project-Structure.md para la jerarquía de carpetas completa)