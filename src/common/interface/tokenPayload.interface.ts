import { UserRoleEnum } from '../enum/user.role.enum';

interface TokenPayload {
  userId: number;
  role: UserRoleEnum;
  // isSecondFactorAuthenticated?: boolean;
}

export default TokenPayload;
