import User from '../../database/models/UsersModel';

export const mockUserLogin = {
  id: 1, 
  username: 'Admin', 
  role: 'admin', 
  email: 'admin@admin.com', 
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
} as User

export const mockToken = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjc3OTQxNDgzLCJleHAiOjE2Nzg1NDYyODN9.lDQUx6yoBnNDPgMqQQQq0QZVM4v85-9QH2JJaoDRrM8'

export const inputLogin = { email: 'admin@admin.com', password: 'secret_admin' }