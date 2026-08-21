import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { upload } from "../../lib/multer";
import { UserController } from "./user.controller";

const router = Router();



router.patch("/profile-image", upload.single("image"),
    auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR, Role.PATIENT),
    UserController.uploadProfileImage);

export const UserRoutes = router;
