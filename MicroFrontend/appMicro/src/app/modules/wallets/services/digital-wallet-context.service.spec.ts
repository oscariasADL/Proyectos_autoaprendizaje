import { TestBed } from '@angular/core/testing';
import { DigitalWalletContextService } from './digital-wallet-context.service';
import { DigitalWalletStrategy } from '../entities/digital-wallet-strategy.interface';
import { DIGITAL_WALLET_STRATEGY } from '@modules/wallets/digital-wallet-provider';

describe('DigitalWalletContextService', () => {
  let service: DigitalWalletContextService;
  let mockStrategy: jasmine.SpyObj<DigitalWalletStrategy>;
  beforeEach(() => {
    mockStrategy = jasmine.createSpyObj('DigitalWalletStrategy', [
      'validateWalletStatus',
      'initializeWalletProvisioning',
      'checkEligibility',
      'createWallet',
      'isWalletCreated',
      'getWalletId',
      'enrollCardToWallet',
      'getDigitalCardId',
      'setCustomCardDisplay',
      'getDigitalCards',
      'getStatusPlatformService',
      'canPushCardInWalletPay',
      'pushCardToWalletPay'
    ]);

    mockStrategy.validateWalletStatus.and.returnValue(Promise.resolve());
    mockStrategy.initializeWalletProvisioning.and.returnValue(
      Promise.resolve()
    );
    mockStrategy.checkEligibility.and.returnValue(Promise.resolve());
    mockStrategy.createWallet.and.returnValue(Promise.resolve());
    mockStrategy.isWalletCreated.and.returnValue(
      Promise.resolve({ wallet: true })
    );
    mockStrategy.getWalletId.and.returnValue(
      Promise.resolve({ walletId: 'wallet-id-123' })
    );
    mockStrategy.enrollCardToWallet.and.returnValue(
      Promise.resolve({ success: 'ok' })
    );
    mockStrategy.getDigitalCardId.and.returnValue(
      Promise.resolve({ digitalCardId: 'digital-card-id-123' })
    );
    mockStrategy.setCustomCardDisplay.and.returnValue(
      Promise.resolve({ imageIsLoaded: true })
    );
    mockStrategy.getDigitalCards.and.returnValue(
      Promise.resolve({ cards: 'cards-list' })
    );
    mockStrategy.getStatusPlatformService.and.returnValue(
      Promise.resolve({ status: 'active' })
    );
    mockStrategy.canPushCardInWalletPay.and.returnValue(
      Promise.resolve({ canPushCardWalletPay: true })
    );
    mockStrategy.pushCardToWalletPay.and.returnValue(
      Promise.resolve({ pushToWalletPay: true })
    );
    TestBed.configureTestingModule({
      providers: [
        DigitalWalletContextService,
        { provide: DIGITAL_WALLET_STRATEGY, useValue: mockStrategy }
      ]
    });
    service = TestBed.inject(DigitalWalletContextService);
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('validateWalletStatus should call the method corresponding to the strategy', async () => {
    await service.validateWalletStatus();
    expect(mockStrategy.validateWalletStatus).toHaveBeenCalled();
  });
  it('initializeWalletProvisioning should call the method corresponding to the strategy', async () => {
    await service.initializeWalletProvisioning();
    expect(mockStrategy.initializeWalletProvisioning).toHaveBeenCalled();
  });
  it('checkEligibility should call the method corresponding to the strategy', async () => {
    await service.checkEligibility();
    expect(mockStrategy.checkEligibility).toHaveBeenCalled();
  });
  it('createWallet should send only the activationCode to the strategy', async () => {
    const options = { activationCode: 'ABC123', phoneNumber: '123456789' };
    await service.createWallet(options);
    expect(mockStrategy.createWallet).toHaveBeenCalledWith({
      activationCode: options.activationCode
    });
  });
  it('isWalletCreated should call the strategy and return the expected value', async () => {
    const result = await service.isWalletCreated();
    expect(mockStrategy.isWalletCreated).toHaveBeenCalled();
    expect(result).toEqual({ wallet: true });
  });
  it('getWalletId should call the strategy and return the expected value', async () => {
    const result = await service.getWalletId();
    expect(mockStrategy.getWalletId).toHaveBeenCalled();
    expect(result).toEqual({ walletId: 'wallet-id-123' });
  });
  it('enrollCardToWallet should send enrollmentData to the strategy', async () => {
    const options = { enrollmentData: 'data123' };
    const result = await service.enrollCardToWallet(options);
    expect(mockStrategy.enrollCardToWallet).toHaveBeenCalledWith({
      enrollmentData: options.enrollmentData
    });
    expect(result).toEqual({ success: 'ok' });
  });
  it('getDigitalCardId should send cardId and return the expected value', async () => {
    const options = { cardId: 'card-001' };
    const result = await service.getDigitalCardId(options);
    expect(mockStrategy.getDigitalCardId).toHaveBeenCalledWith({
      cardId: options.cardId
    });
    expect(result).toEqual({ digitalCardId: 'digital-card-id-123' });
  });
  it('setCustomCardDisplay should send the correct parameters to the strategy', async () => {
    const options = {
      cardId: 'card-001',
      cardImageUrl: 'http://image.url',
      cardDescription: 'Descripción de la tarjeta'
    };
    const result = await service.setCustomCardDisplay(options);
    expect(mockStrategy.setCustomCardDisplay).toHaveBeenCalledWith({
      cardId: options.cardId,
      cardImageUrl: options.cardImageUrl,
      cardDescription: options.cardDescription
    });
    expect(result).toEqual({ imageIsLoaded: true });
  });
  it('getDigitalCards should call the strategy and return the expected value', async () => {
    const result = await service.getDigitalCards();
    expect(mockStrategy.getDigitalCards).toHaveBeenCalled();
    expect(result).toEqual({ cards: 'cards-list' });
  });
  it('getStatusPlatformService should send cardId and return the expected value', async () => {
    const options = { cardId: 'card-002' };
    const result = await service.getStatusPlatformService(options);
    expect(mockStrategy.getStatusPlatformService).toHaveBeenCalledWith({
      cardId: options.cardId
    });
    expect(result).toEqual({ status: 'active' });
  });
  it('canPushCardInWalletPay should send cardId and return the expected value', async () => {
    const options = { cardId: 'card-003' };
    const result = await service.canPushCardWalletPay(options);
    expect(mockStrategy.canPushCardInWalletPay).toHaveBeenCalledWith({
      cardId: options.cardId
    });
    expect(result).toEqual({ canPushCardWalletPay: true });
  });
  it('pushCardToWalletPay should send cardId and return the expected value', async () => {
    const options = { cardId: 'card-004' };
    const result = await service.pushCardToWalletPay(options);
    expect(mockStrategy.pushCardToWalletPay).toHaveBeenCalledWith({
      cardId: options.cardId
    });
    expect(result).toEqual({ pushToWalletPay: true });
  });
});
