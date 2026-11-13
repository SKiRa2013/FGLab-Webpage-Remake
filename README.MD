# Future Gadget Lab Webpage - Remake

A remake of the Steins;Gate's FG Lab webpage using new technologies.

This project is made to get used to "new" web development technologies (as FastAPI and React) - I know they are not new, but they're
newer than the plain HTML and CSS of the original webpage - and interlapping DevOps technologies as Docker, Docker Compose,
Kubernetes, and others... (will be decided in the future, I guess).

If you need to contact me about anything related to this repository, you can send me an email at <skira250128@gmail.com>.

This is just a temporary README.MD, I intend to update this to look way better.

# Instructions for deployment (temporary in Spanish)

## Guía de Despliegue y Arquitectura Local (Kubernetes + ngrok + React)

Este proyecto está compuesto por:
- **Frontend (`react/`):** Aplicación SPA construida con React, Vite y Tailwind CSS, desplegada en GitHub Pages (`/FGLab-Webpage-Remake/`).
- **Backend (`fastapi/`):** API REST construida con FastAPI y SQLAlchemy Core, conectada a una base de datos PostgreSQL.
- **Orquestación (`k8s/`):** Manifiestos de Kubernetes diseñados para correr en un clúster local con **kind** (Kubernetes in Docker) y exponerse a internet mediante un túnel inverso HTTPS con **ngrok**.

---

### 1. Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas en tu sistema:

- **Docker** (con el demonio activo y permisos para tu usuario)
- **kind** (`Kubernetes in Docker`)
- **kubectl**
- **Node.js 20+** y **npm** (opcional si deseas levantar el frontend fuera de contenedores)
- **ngrok** (con una cuenta gratuita y tu `authtoken` configurado)

---

### 2. Estructura del Proyecto

```text
FGLab-Webpage-Remake/
├── fastapi/          # Código fuente de la API FastAPI y Dockerfile
├── k8s/                   # Manifiestos YAML de Kubernetes (Namespace, ConfigMap, Secrets, Deployments, Services)
├── react/                 # Código fuente del frontend (Vite + React)
└── .github/workflows/     # Pipeline de CI/CD para despliegue automático en GitHub Pages
```

### 3. Levantar el Backend en Kubernetes (`kind`)

#### 3.1. Crear el clúster local
Crea un clúster de `kind` dedicado para el proyecto:

```bash
kind create cluster --name fglab-cluster
```

Verifica que el nodo esté listo:

```bash
kubectl get nodes
```

#### 3.2. Construir la imagen Docker de FastAPI y cargarla en `kind`
Como `kind` corre dentro de contenedores Docker aislados, no ve las imágenes locales de tu máquina automáticamente. Debes construir la imagen de FastAPI y cargarla explícitamente en el clúster:

```bash
docker build -t fglab_fastapi:latest ./fastapi
kind load docker-image fglab_fastapi:latest --name fglab-cluster
```

*(Nota: Si más adelante modificas el código del backend, vuelve a ejecutar estos dos comandos seguidos de `kubectl rollout restart deployment/fastapi -n fglab`).*

#### 3.3. Configurar credenciales y aplicar los manifiestos de Kubernetes
1. Revisa los archivos dentro de `k8s/` (especialmente el `Secret` y el `ConfigMap`) y asegúrate de definir tus credenciales de PostgreSQL (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`) y la cadena de conexión `DATABASE_URL` apuntando al servicio interno de Kubernetes (`postgres-service`).
2. Aplica todos los manifiestos al clúster:

```bash
kubectl apply -f k8s/
```

3. Comprueba que tanto el pod de **PostgreSQL** como el de **FastAPI** estén en estado `Running` y `1/1 Ready`:

```bash
kubectl get pods -n fglab
```

#### 3.4. (Opcional) Restaurar datos iniciales en PostgreSQL
Si cuentas con un respaldo SQL (por ejemplo `backup_labmem.sql`), puedes importarlo directamente al contenedor de PostgreSQL en Kubernetes y resincronizar las secuencias autoincrementales:

> Para este ejemplo asumimos que el nombre de la base de datos es `fglab_db` y el usuario `postgres`, cambia estos valores por los valores de `DATABASE_NAME` y `DATABASE_USER` según corresponda.

```bash
# Copiar e importar respaldo
kubectl cp backup_labmem.sql fglab/$(kubectl get pod -n fglab -l app=postgres -o jsonpath='{.items[0].metadata.name}'):/tmp/backup.sql
kubectl exec -it -n fglab deploy/postgres -- psql -U postgres -d fglab_db -f /tmp/backup.sql

# Asegurar valor por defecto en created_at y sincronizar secuencias SERIAL
kubectl exec -it -n fglab deploy/postgres -- psql -U postgres -d fglab_db -c "
ALTER TABLE bbs_posts ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;
SELECT setval(pg_get_serial_sequence('bbs_users', 'id'), COALESCE(MAX(id), 1)) FROM bbs_users;
SELECT setval(pg_get_serial_sequence('bbs_posts', 'id'), COALESCE(MAX(id), 1)) FROM bbs_posts;
"
```

---

### 4. Exponer la API con Túnel Inverso (`ngrok`)

Dado que el clúster de `kind` mapea el puerto del servicio de FastAPI directamente al puerto `8000` del host local (`localhost:8000`) mediante la configuración del clúster y el `Service` de Kubernetes, no necesitas ejecutar `kubectl port-forward` manualmente. Solo debes exponer `localhost:8000` a internet con **ngrok** para obtener una URL pública HTTPS (evitando errores de *Mixed Content* desde GitHub Pages).

#### 4.1. Verificar que el servicio responde en local
Antes de abrir el túnel, confirma que el contenedor de `kind` está enrutando el tráfico hacia tu máquina local:

```bash
curl -I http://localhost:8000/docs
```

Deberías recibir un `HTTP/1.1 200 OK`.

#### 4.2. Abrir el túnel HTTPS con ngrok
1. Si es la primera vez que usas ngrok en tu equipo, vincula tu token de autenticación:

```bash
ngrok config add-authtoken <TU_NGROK_AUTHTOKEN>
```

2. En una **segunda terminal**, inicia el túnel apuntando al puerto `8000`:

```bash
ngrok http 8000
```

3. Copia la URL pública HTTPS que te asigna ngrok (por ejemplo: `https://tu-subdominio.ngrok-free.dev`).

> **Importante sobre CORS y cabeceras de ngrok:**
> - En `fastapi/`, `CORSMiddleware` debe incluir en `allow_origins` el dominio raíz desde donde se sirve el frontend (ej. `"https://skira2013.github.io"`, sin subrutas ni barra final).
> - El frontend envía la cabecera `ngrok-skip-browser-warning: true` en sus peticiones `fetch` para saltar la pantalla intersticial gratuita de ngrok.

---

### 5. Levantar o Desplegar el Frontend (`react/`)

#### 5.1. Ejecución en modo desarrollo local
1. Entra al directorio `react/` e instala dependencias:

```bash
cd react
npm install
```

2. Crea un archivo `.env.local` (ignorado por Git) con la URL de tu backend (local o túnel de ngrok, **sin barra final**):

```env
VITE_API_URL=http://localhost:8000
```

3. Inicia el servidor de desarrollo de Vite:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

#### 5.2. Despliegue en GitHub Pages (Producción)
El repositorio incluye un workflow automatizado en `.github/workflows/deploy.yml` que compila la aplicación de `react/` y la publica en GitHub Pages cada vez que se hace `push` a `main`:

1. En tu repositorio de GitHub, ve a **Settings → Pages** y selecciona **GitHub Actions** como fuente (*Source*).
2. Ve a **Settings → Secrets and variables → Actions → Variables** y crea la variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://tu-subdominio.ngrok-free.dev` *(asegúrate de incluir `https://` y omitir la barra `/` al final)*.
3. Si actualizas la URL de ngrok en el futuro, edita la variable `VITE_API_URL` en GitHub y lanza manualmente el workflow desde la pestaña **Actions → Run workflow** para que Vite recompile el bundle con el nuevo endpoint.

---

### 6. Resumen de Comandos Útiles de Mantenimiento

| Acción | Comando |
| :--- | :--- |
| Ver estado de pods y servicios | `kubectl get all -n fglab` |
| Ver logs en tiempo real de FastAPI | `kubectl logs -f -n fglab deploy/fastapi` |
| Actualizar backend tras cambios en código | `docker build -t fglab_fastapi:latest ./fastapi && kind load docker-image fglab_fastapi:latest --name fglab-cluster && kubectl rollout restart deployment/fastapi -n fglab` |
| Apagar el clúster sin borrarlo | `docker stop fglab-cluster-control-plane` |
| Encender el clúster nuevamente | `docker start fglab-cluster-control-plane` |
| Eliminar el clúster por completo | `kind delete cluster --name fglab-cluster` |
