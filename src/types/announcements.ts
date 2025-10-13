export interface CreateAnnouncementDto {
  title: string;
  body: string;
  audience_type: string;
  audience_specifier?: (string | number)[];
  channels: string[];
  scheduled_for?: string; // ISO 8601
}

export type UpdateAnnouncementDto = Partial<CreateAnnouncementDto>;

export interface GetReceiptsQueryDto {
  page?: number;
  limit?: number;
}
