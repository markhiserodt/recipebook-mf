import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "@recipebook-mf/services";
import { AccountRoles } from "../enumerations/account-roles.enum";

export const adminGuardFn: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (!userService.account$()?.idTokenClaims?.roles?.includes(AccountRoles.Admin.toLowerCase())) {
    return router.createUrlTree(['/account']);
  }
  return true;
}
