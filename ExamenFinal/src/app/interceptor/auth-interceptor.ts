import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes("login")) {
    return next(req);
  }

  const token = localStorage.getItem("token");

  // Si no hay token, deja pasar sin Authorization
  if (!token) {
    return next(req);
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`
  };

  if (req.method === 'POST' || req.method === 'PUT') {
    headers['Content-Type'] = 'application/json';
  }

  const cloneRequest = req.clone({ setHeaders: headers });
  return next(cloneRequest);
};