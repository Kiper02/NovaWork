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

interface VerificationTemplateProps {
  code: string;
}

export default function VerificationTemplate({
  code,
}: VerificationTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Верификация аккаунта</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-[#131317]">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-white font-bold">Nova</Heading>
            <Text className="text-xl text-white font-bold">
              Подтверждение вашей почты
            </Text>
            <Text className="text-base text-white mb-4">
              Спасибо за регистрацию в Nova Work! Для подтверждения вашего
              адреса электронной почты, пожалуйста, используйте следующий код:
            </Text>

            {/* Блок с кодом */}
            <Section className="bg-[#253ECE] rounded-lg p-4 mx-auto max-w-xs">
              <Text className="text-2xl font-bold text-white text-center tracking-widest">
                {code}
              </Text>
            </Section>

            <Text className="text-base text-white mt-4">
              Введите этот код на странице подтверждения в вашем аккаунте.
            </Text>
          </Section>

          <Section className="text-center mt-8">
            <Text className="text-gray-600">
              Если у вас есть вопросы или вы столкнулись с трудностями, не
              стесняйтесь обращаться в нашу службу поддержки по адресу{' '}
              <Link
                href="mailto:nova-service.sup@mail.ru"
                className="text-[#5074d6] underline"
              >
                help@nova
              </Link>
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
