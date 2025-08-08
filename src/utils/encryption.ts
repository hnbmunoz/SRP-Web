/**
 * Encryption utility for secure localStorage persistence
 * Uses AES-256-GCM encryption with Web Crypto API
 */

// Generate a key from a password using PBKDF2
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Generate a random salt
function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16));
}

// Generate a random IV
function generateIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(12));
}

// Convert ArrayBuffer to base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert base64 string to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Get or generate encryption password (in production, this should be more secure)
function getEncryptionPassword(): string {
  // In production, you might want to:
  // 1. Derive this from user credentials
  // 2. Use environment variables
  // 3. Implement key rotation
  // 4. Use hardware security modules
  
  const storedPassword = sessionStorage.getItem('_app_key');
  if (storedPassword) {
    return storedPassword;
  }

  // Generate a session-based key
  const password = crypto.getRandomValues(new Uint8Array(32));
  const passwordString = arrayBufferToBase64(password);
  sessionStorage.setItem('_app_key', passwordString);
  return passwordString;
}

/**
 * Encrypt data for storage
 */
export async function encryptData(data: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const password = getEncryptionPassword();
    const salt = generateSalt();
    const iv = generateIV();
    
    const key = await deriveKey(password, salt);
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      dataBuffer
    );

    // Combine salt, iv, and encrypted data
    const combined = new Uint8Array(salt.length + iv.length + encryptedBuffer.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);

    return arrayBufferToBase64(combined.buffer);
  } catch (error) {
    console.error('Encryption failed:', error);
    // Fallback to unencrypted data in case of encryption failure
    return data;
  }
}

/**
 * Decrypt data from storage
 */
export async function decryptData(encryptedData: string): Promise<string> {
  try {
    const password = getEncryptionPassword();
    const combinedBuffer = base64ToArrayBuffer(encryptedData);
    const combined = new Uint8Array(combinedBuffer);

    // Extract salt, iv, and encrypted data
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const encrypted = combined.slice(28);

    const key = await deriveKey(password, salt);

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    console.error('Decryption failed:', error);
    // Return the original data if decryption fails (might be unencrypted legacy data)
    return encryptedData;
  }
}

/**
 * Check if data appears to be encrypted
 */
export function isEncrypted(data: string): boolean {
  try {
    // Encrypted data should be base64 and have minimum length
    if (data.length < 44) return false; // Minimum length for salt + iv + some data
    
    // Try to decode as base64
    const decoded = base64ToArrayBuffer(data);
    return decoded.byteLength >= 32; // At least salt + iv
  } catch {
    return false;
  }
}

/**
 * Clear encryption keys (useful for logout)
 */
export function clearEncryptionKeys(): void {
  sessionStorage.removeItem('_app_key');
}

/**
 * Create encrypted storage interface for Zustand persist
 */
export const createEncryptedStorage = () => ({
  getItem: (name: string) => {
    try {
      const encryptedValue = localStorage.getItem(name);
      if (!encryptedValue) return null;
      
      // Check if the data is encrypted
      if (isEncrypted(encryptedValue)) {
        // Return a promise for encrypted data
        return decryptData(encryptedValue);
      }
      
      // Return as-is if not encrypted (backward compatibility)
      return encryptedValue;
    } catch (error) {
      console.error('Failed to get encrypted item:', error);
      return null;
    }
  },
  
  setItem: (name: string, value: string) => {
    try {
      // Encrypt and store asynchronously
      encryptData(value).then(encryptedValue => {
        localStorage.setItem(name, encryptedValue);
      }).catch(error => {
        console.error('Failed to encrypt data, storing unencrypted:', error);
        localStorage.setItem(name, value);
      });
    } catch (error) {
      console.error('Failed to set encrypted item:', error);
      localStorage.setItem(name, value);
    }
  },
  
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  }
});

// Export types for TypeScript
export interface EncryptedStorage {
  getItem: (name: string) => Promise<string | null>;
  setItem: (name: string, value: string) => Promise<void>;
  removeItem: (name: string) => void;
}