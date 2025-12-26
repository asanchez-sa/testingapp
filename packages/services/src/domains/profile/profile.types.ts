export interface Profile {
  id: string;
  userId: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
}
