export const TYPES = {
    repository: {
        GetBalanceRepositoryInterface: 'GetBalanceRepository',
        WithdrawBalanceRepositoryInterface: 'WithdrawBalanceRepository',
        DepositBalanceRepositoryInterface: 'DepositBalanceRepository',
        SaveTransactionRepositoryInterface: 'SaveTransactionRepository',
        SaveArpTransactionRepositoryInterface: 'SaveArpTransactionRepository',
    },
    velaRepository: {
        GetBalanceRepositoryInterface: 'VelaGetBalanceRepository',
        GetWalletBalanceRepositoryInterface: 'VelaGetWalletBalanceRepository',
        ListAllRebateTransactionRepositoryInterface: 'VelaListAllRebateTransactionRepository',
        GetRebateWalletBalanceRepositoryInterface: 'VelaGetRebateWalletBalanceRepository',
        DepositBalanceRepositoryInterface: 'VelaDepositBalanceRepository',
        WithdrawBalanceRepositoryInterface: 'VelaWithdrawBalanceRepository',
        RebateBalanceRepositoryInterface: 'VelaRebateBalanceRepository',
        SaveVelaTransactionRepositoryInterface: 'SaveVelaTransactionRepository',
    },
};
