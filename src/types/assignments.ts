export interface CreateAssignmentDto {
  content_id: number;
  instructions: string;
  due_date?: string; // ISO
  max_points?: number;
}

export type UpdateAssignmentDto = Partial<CreateAssignmentDto>;
