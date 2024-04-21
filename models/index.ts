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
}