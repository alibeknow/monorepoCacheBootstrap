import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { AccountEntity } from '@shared/account';
import { AccountDto } from '../../gateway/accounts/dto/account.dto';

@Injectable()
export class AccountService {
  private readonly accountRepository: Repository<AccountEntity>;
  constructor(private readonly connection: Connection) {
    this.accountRepository = this.connection.getRepository(AccountEntity);
  }

  findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.find();
  }

  findOne(id: string): Promise<AccountEntity | undefined> {
    return this.accountRepository.findOne({ id });
  }
  create(account: AccountDto): Promise<AccountEntity> {
    const accountEntity = this.accountRepository.create(account);
    return this.accountRepository.save(accountEntity);
  }

  async checkBalance(from: string, money: number): Promise<boolean> {
    const resulter = await this.accountRepository.findOne({ id: from });
    if (resulter && resulter.balance > money) return true;
    return false;
  }
}
