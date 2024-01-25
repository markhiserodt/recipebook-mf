import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { FeatureService } from "@recipebook-mf/services";
import { Features } from "../enumerations/feature.enum";

export const inventoryGuardFn: CanActivateFn = () => {
  const featureService = inject(FeatureService);
  const router = inject(Router);
  const feature = featureService.features$().find(feature => feature.name?.toLowerCase() === Features.Inventory.toLowerCase());
  if (!feature?.flag) {
    return router.createUrlTree(['/']);
  }
  return true;
}
