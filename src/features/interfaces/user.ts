export interface ARO {
  moduleName: string;
  role: string;
}

export interface User {
  userId: string;
  password: string;  
  key: string;
  refreshKey: string;
  error_message: string;
  roles : ARO[];
}