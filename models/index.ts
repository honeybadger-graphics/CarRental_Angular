export interface ToolDTO {
    id: number;
    toolId: string;
    toolBrand: string;
    toolName: string;
    toolType: string;
    toolPower: number;
    toolWeight: number;
    toolDeposit: number;
    toolDailyCost: number;
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
    timestamp: Date;
    reason: string;
    source: CompanyDTO | null;
    
}