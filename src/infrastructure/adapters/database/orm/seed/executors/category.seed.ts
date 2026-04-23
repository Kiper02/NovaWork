import { PrismaClient } from '@prisma/client';
import { categories } from '../data/category.data';

export default async function (prisma: PrismaClient) {
  const rootCategories = categories.filter(c => !c.parentId);
  for (const root of rootCategories) {
    await prisma.category.upsert({
      where: { name: root.name },
      update: {},
      create: { name: root.name, description: root.description }
    });
  }

  const allRoots = await prisma.category.findMany({
    where: { name: { in: rootCategories.map(r => r.name) } }
  });
  const rootMap = new Map(allRoots.map(r => [r.name, r.id]));

  const children = categories.filter(c => c.parentId);
  for (const child of children) {
    const parentId = rootMap.get(child.parentId!);
    if (!parentId) {
      console.warn(
        `Родитель ${child.parentId} не найден для категории ${child.name}`,
      );
      continue;
    }
    await prisma.category.upsert({
      where: { name: child.name },
      update: {},
      create: {
        name: child.name,
        description: child.description,
        parentId: parentId,
      },
    });
  }
}
