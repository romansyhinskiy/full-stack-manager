export const localStorageData = () => {
  const rawToken = `Bearer ${localStorage.getItem('token')}`;
  const token = rawToken.replace(/"/g, '');
  return token
}