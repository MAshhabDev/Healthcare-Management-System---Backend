import { buffer } from "node:stream/consumers";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
  cloudinary.uploader
    .upload_stream(
      {
        resource_type: "auto",
      },
      async (error, result) => {
        if (error) {
          console.log(error);
          throw new Error(error.message);
        }

        const updateUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            imageUrl: result?.secure_url,
            imagePublicId: result?.public_id,
          },
        });
      },
    )
    .end(buffer);
};

export const UserService = {
  uploadProfileImage,
};
