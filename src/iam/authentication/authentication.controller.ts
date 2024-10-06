import { Controller } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
}
