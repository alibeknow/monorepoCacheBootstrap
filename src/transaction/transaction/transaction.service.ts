import { Injectable } from '@nestjs/common';
import { Repository, getManager, Connection } from 'typeorm';
import { AccountEntity } from '@shared/account';
import { TransactionDto } from './transaction.dtos';
import { TransactionsEntity, TransactionStatus } from '@shared/transactions';

@Injectable()
export class TransactionService {
  private accountRepository: Repository<AccountEntity>;
  private transactionRepository: Repository<TransactionsEntity>;
  constructor(private readonly connection: Connection) {
    this.accountRepository = this.connection.getRepository(AccountEntity);
    this.transactionRepository =
      this.connection.getRepository(TransactionsEntity);
  }

  async create(eventData: TransactionDto): Promise<TransactionsEntity | void> {
    const transactionInstance = this.transactionRepository.create({
      to: eventData.to,
      from: eventData.from,
      money: eventData.money,
      message: eventData.message,
      transactionStatus: TransactionStatus.SUCCESSFUL,
    });
    const transactionResult =
      this.transactionRepository.save(transactionInstance);
    return transactionResult;
  }

  async checkAndCreate(eventData: TransactionDto): Promise<boolean> {
    const sender = await this.accountRepository.findOne({
      id: eventData.from,
    });
    const recipient = await this.accountRepository.findOne({
      id: eventData.to,
    });
    if (sender && sender.balance > eventData.money && recipient) {
      try {
        await getManager().transaction(async (transactionalEntityManager) => {
          recipient.balance += eventData.money;
          sender.balance -= eventData.money;
          await transactionalEntityManager.save(recipient);
          await transactionalEntityManager.save(sender);
          await this.create(eventData);
        });
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
