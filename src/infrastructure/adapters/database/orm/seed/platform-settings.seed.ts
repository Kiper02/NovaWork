import { PrismaClient } from '@prisma/client';

export default async function(prisma: PrismaClient) {
  const defaultSettings = {
    id: 'singleton',
    settings: {
      fileLimits: {
        maxFileSizeBytes: 25_000_000,
        maxFilesPerMessage: 5,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
        ],
      },
      storageQuotas: {
        freeBytes: 1_000_000_000,
        proBytes: 5_000_000_000,
      },
    },
    version: 1,
    updatedBy: 'system',
    updatedAt: new Date(),
  };
  return prisma.platformSettings.upsert({
    where: {
      id: defaultSettings.id,
    },
    update: defaultSettings,
    create: defaultSettings,
  });
}