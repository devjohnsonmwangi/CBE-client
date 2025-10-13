export interface CreateVenueDto {
  school_id: number;
  name: string;
  capacity?: number;
}

export type UpdateVenueDto = Partial<CreateVenueDto>;
