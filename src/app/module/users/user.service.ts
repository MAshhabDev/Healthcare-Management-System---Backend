import { buffer } from "node:stream/consumers";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import type { UploadApiResponse } from "cloudinary";

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
  //check or find the current user  
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      imagePublicId: true,
      imageUrl: true,
    },
  });


  // set the image in cloudinary
  const cloudinaryResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
          },
          async (error, result) => {
            if (error) {
              return reject(error.message);
            }

            if (!result) {
              return reject(new Error("No result returned from Cloudinary"));
            }
            resolve(result);
          },
        )
        .end(buffer);
    },
  );

  // update the image into db from cloudinary
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      imageUrl: cloudinaryResult?.secure_url,
      imagePublicId: cloudinaryResult?.public_id,
    },
    omit: {
      password: true,
    },
  });


  // if already a image decalre then delet it and update the new one 

  if (currentUser?.imagePublicId && currentUser.imageUrl) {
    await cloudinary.uploader.destroy(currentUser.imagePublicId);
  }

  return updateUser;
};

export const UserService = {
  uploadProfileImage,
};
