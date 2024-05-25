import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let a = localStorage.getItem("token");
  const router = inject(Router)
  if (a === null) {
    router.navigateByUrl("/home")
    return false;
  }
  return true;
};