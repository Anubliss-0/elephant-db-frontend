export interface Photo {
  id: string | null
  url: string
  status: "keep" | "deleted" | "new"
  file?: File
  position: number
}

// export interface Profile {
//   id: number;
//   user_id: number;
//   name: string;
//   gender: string;
//   location: string;
//   updated_at: string;
//   created_at: string;
//   profileimage_url: string;
// }

// export interface User {
//   id: number;
//   email: string;
//   created_at: string;
//   created_date: string;
//   profile: Profile;
// }

export interface userProfileContext {
  userName: string;
  profileId: number;
  userId: number;
  profileImageUrl: string;
}

// Define a type for the response data
export interface UserProfileResponse {
  data: {
    name: string;
    user_id: number;
    id: number;
    profileimage_url: string;
  };
}

export interface ElephantIndexData {
  id: number
  type: string
  attributes: {
    name: string
    photo: string
    species: string
    gender: string
    habitat: string
  }
}