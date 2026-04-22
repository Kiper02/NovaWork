import { RegisterUseCase } from './register.use-case';
import { EmailSenderPort } from '../../../ports/email-sender/email-sender.port';
import { VerificationCodeGeneratorPort } from '../../../ports/verification-code-generator/verification-code-generator.port';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { IRegisterCommand } from './register.command';
import { CreateUserUseCase } from '../../user/create-user/create-user.use-case';

jest.mock('../../user/create-user/create-user.use-case')
jest.mock('../../../ports/email-sender/email-sender.port');
jest.mock('../../../ports/verification-code-generator/verification-code-generator.port');

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let mockCreateUserUseCase: jest.Mocked<CreateUserUseCase>;
  let mockEmailSender: jest.Mocked<EmailSenderPort>;
  let mockCodeGenerator: jest.Mocked<VerificationCodeGeneratorPort>;

  const mockUser: UserEntity = {
    id: 'user-123',
    email: 'test@example.com',
    username: 'testuser',
    passwordHash: 'hashed',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as UserEntity;

  const mockCommand: IRegisterCommand = {
    username: 'testuser',
    password: 'plainPassword',
    email: 'test@example.com',
    firstName: 'Test',
    middleName: '',
    lastName: 'User',
  };

  beforeEach(() => {
    mockCreateUserUseCase = {
      execute: jest.fn(),
    } as any;

    mockEmailSender = {
      sendVerificationCode: jest.fn(),
    } as any;

    mockCodeGenerator = {
      generateCode: jest.fn(),
    } as any;

    registerUseCase = new RegisterUseCase(
      mockCreateUserUseCase,
      mockEmailSender,
      mockCodeGenerator,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully register a user and send verification code', async () => {
    mockCreateUserUseCase.execute.mockResolvedValue(mockUser);
    mockCodeGenerator.generateCode.mockReturnValue('123456');
    mockEmailSender.sendVerificationCode.mockResolvedValue();

    const result = await registerUseCase.execute(mockCommand);

    expect(mockCreateUserUseCase.execute).toHaveBeenCalledTimes(1);
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(mockCommand);
    expect(mockCodeGenerator.generateCode).toHaveBeenCalledTimes(1);
    expect(mockEmailSender.sendVerificationCode).toHaveBeenCalledTimes(1);
    expect(mockEmailSender.sendVerificationCode).toHaveBeenCalledWith(
      mockUser.email,
      '123456',
    );
    expect(result).toBe(mockUser);
  });

  it('should throw an error if CreateUserUseCase fails and not send email', async () => {
    const expectedError = new Error('User already exists');
    mockCreateUserUseCase.execute.mockRejectedValue(expectedError);

    await expect(registerUseCase.execute(mockCommand)).rejects.toThrow(
      expectedError,
    );
    expect(mockCodeGenerator.generateCode).not.toHaveBeenCalled();
    expect(mockEmailSender.sendVerificationCode).not.toHaveBeenCalled();
  });

  it('should propagate error if email sending fails', async () => {
    mockCreateUserUseCase.execute.mockResolvedValue(mockUser);
    mockCodeGenerator.generateCode.mockReturnValue('654321');
    const emailError = new Error('SMTP error');
    mockEmailSender.sendVerificationCode.mockRejectedValue(emailError);

    await expect(registerUseCase.execute(mockCommand)).rejects.toThrow(
      emailError,
    );
    expect(mockCreateUserUseCase.execute).toHaveBeenCalled();
    expect(mockCodeGenerator.generateCode).toHaveBeenCalled();
  });
});
