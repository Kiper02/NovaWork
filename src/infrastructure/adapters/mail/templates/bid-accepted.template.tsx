import {
  Body,
  Head,
  Heading,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface BidAcceptedTemplateProps {
  bidId: string;
  username: string;
  taskTitle: string;
  taskUrl: string;
}

export default function BidAcceptedTemplate({
  bidId,
  username,
  taskTitle,
  taskUrl,
}: BidAcceptedTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Ваш отклик принят!</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-[#131317]">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-white font-bold">
              Nova Work
            </Heading>
            <Text className="text-xl text-white font-bold">Отклик принят!</Text>
            <Text className="text-base text-white mb-4">
              Привет, <strong>{username}</strong>!
            </Text>
            <Text className="text-base text-white mb-4">
              Поздравляем! Ваш отклик на задачу <strong>{taskTitle}</strong>{' '}
              был принят заказчиком.
            </Text>
            <Text className="text-base text-white mb-4">
              Вы можете перейти к обсуждению деталей и начать работу.
            </Text>

            <Section className="bg-[#253ECE] rounded-lg p-4 mx-auto max-w-xs">
              <Link
                href={taskUrl}
                className="text-white font-bold text-lg underline"
              >
                Перейти к проекту
              </Link>
            </Section>

            <Text className="text-base text-white mt-4">
              ID вашего отклика: <strong>{bidId}</strong>
            </Text>
            <Text className="text-sm text-gray-400 mt-2">
              Если ссылка не работает, скопируйте её вручную: {taskUrl}
            </Text>
          </Section>

          <Section className="text-center mt-8">
            <Text className="text-gray-500 text-sm">
              Если у вас есть вопросы или вы столкнулись с трудностями,
              обращайтесь в поддержку:{' '}
              <Link
                href="mailto:nova-service.sup@mail.ru"
                className="text-[#5074d6] underline"
              >
                nova-service.sup@mail.ru
              </Link>
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
