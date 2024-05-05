export interface CarDTO {
    id: number;
    carId: string;
    carBrand: string;
    carName: string;
    carType: string;
    carPower: number;
    carWeight: number;
    carDeposit: number;
    carDailyCost: number;
}
export interface CompanyDTO {
    id: number;
    companyName: string;
    companyContactName: string;
    companyTaxNumber: number;
    compRegNumber: number;
    companyHQ: string;
    companyAccount: CompanyAccountDTO | null;
}
export interface CompanyAccountDTO {
    id: number;
    companyBalance: number;
    companyOwner: CompanyDTO | null;
}
export interface CompanyTransactionsDTO {
    id: number;
    amount: number;
    timestamp: string;
    reason: string;
    source: CompanyDTO | null;
    
}