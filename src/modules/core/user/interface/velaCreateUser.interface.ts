
export interface CreateUserVela{
   host_id: string;

   member_id: string;

   currency: string;
}

export interface saveUserVela {
   id: number;
   username: string;
   host_id: string;
   member_id: string;
   currency: string;
   created_at: Date;
   updated_at: Date
}