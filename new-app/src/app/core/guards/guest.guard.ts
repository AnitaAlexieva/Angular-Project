import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

export const GuestGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    const router = inject(Router);

    if (userService.isLogged) {
        router.navigate(['/']); // или ['/profile']
        return false;
    }

    return true;
}
