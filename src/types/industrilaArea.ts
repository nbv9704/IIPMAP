export interface IndustrialAreaCardDto {
  id: string;                         // Guid
  name: string;
  slug: string;
  addressDetail: string;
  totalArea: number;
  vacantArea: number;
  landLeasePrice?: number | null;
  images?: string[] | null;
  operationStartDate?: string
}
