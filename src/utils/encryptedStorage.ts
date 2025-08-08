import type { PersistStorage, StorageValue } from 'zustand/middleware';
import { encryptData, decryptData, isEncrypted } from './encryption';

/**
 * Creates an encrypted storage wrapper for Zustand persist middleware
 * This storage automatically encrypts data before storing and decrypts when retrieving
 */
export const createEncryptedStorage = <T>(): PersistStorage<T> => {
  return {
    getItem: async (name: string): Promise<StorageValue<T> | null> => {
      try {
        const item = localStorage.getItem(name);
        if (!item) return null;
        
        let jsonString: string;
        
        // Check if the data is encrypted
        if (isEncrypted(item)) {
          // Decrypt the data
          jsonString = await decryptData(item);
        } else {
          // Use as-is if not encrypted (for backward compatibility)
          jsonString = item;
        }
        
        // Parse the JSON string back to the state object
        return JSON.parse(jsonString) as StorageValue<T>;
      } catch (error) {
        console.error('Failed to retrieve encrypted data:', error);
        // Return null to let Zustand handle the error gracefully
        return null;
      }
    },
    
    setItem: async (name: string, value: StorageValue<T>): Promise<void> => {
      try {
        // Convert the state object to JSON string
        const jsonString = JSON.stringify(value);
        
        // Encrypt the JSON string before storing
        const encrypted = await encryptData(jsonString);
        localStorage.setItem(name, encrypted);
      } catch (error) {
        console.error('Failed to encrypt data, storing unencrypted:', error);
        // Fallback to unencrypted storage if encryption fails
        const jsonString = JSON.stringify(value);
        localStorage.setItem(name, jsonString);
      }
    },
    
    removeItem: (name: string): void => {
      localStorage.removeItem(name);
    }
  };
};

/**
 * Pre-configured encrypted storage instance
 */
export const encryptedStorage = createEncryptedStorage();