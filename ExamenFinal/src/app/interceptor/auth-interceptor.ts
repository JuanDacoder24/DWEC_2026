import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 // Si es login, pasa la request original sin modificar
  if (req.url.includes("login")) {
    return next(req);
  }

  // Para todas las demás peticiones, clona y agrega el token
  const cloneRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token") || ""}`
    }
  });

  return next(cloneRequest);
};