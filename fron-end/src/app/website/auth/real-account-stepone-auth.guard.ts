import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RealAccountService } from "../services/real-account.service";

@Injectable({ providedIn: 'root' })
export class RealAccountStepOneAuthGuard implements CanActivate {
    constructor(private route: Router, private realAccountService: RealAccountService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.realAccountService.realFormStepOne != undefined) {
            if (this.realAccountService.realFormStepOne.value.firstName != undefined &&
                this.realAccountService.realFormStepOne.value.lastName != undefined &&
                this.realAccountService.realFormStepOne.value.country != undefined &&
                this.realAccountService.realFormStepOne.value.email != undefined &&
                this.realAccountService.realFormStepOne.value.password != undefined &&
                this.realAccountService.realFormStepOne.value.confiremPassword != undefined
            ) {
                return true;

            } else {
                this.route.navigate(['/real_account_step_one']);
                return false;
            }
        } else {
            this.route.navigate(['/real_account_step_one']);
            return false;
        }




    }
}