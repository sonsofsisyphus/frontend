import { UserCredentials } from "./backend";
  
  // Set UserCredentials as a cookie
 export function setUserCredentials(credentials: UserCredentials): void {
    const serializedCredentials = JSON.stringify(credentials);
    setCookie('userCredentials', serializedCredentials);
  }
  
  // Get UserCredentials from a cookie
  export function getUserCredentials(): UserCredentials {
    const serializedCredentials = getCookie('userCredentials');
    if(serializedCredentials === "") return {token : "", userID : ""};
        const a : UserCredentials = JSON.parse(serializedCredentials);
        return a;   
  }
  
  // Delete UserCredentials cookie
  export function deleteUserCredentials(): void {
    deleteCookie('userCredentials');
  }
  
  // Cookie utility functions
  function setCookie(name: string, value: string): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 1000 * 60 * 60 * 2);
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }
  
  function getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    try {
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  } catch {
  }
  return "";
  }
  
  function deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  export function validateUserCredential() {
    
  }
